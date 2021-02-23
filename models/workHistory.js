const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { User } = require("./user");
const { Profession } = require("./profession");
const { Specialty } = require("./specialty");
const WorkHistory = sequelize.define('workHistory', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    currentlyWorking: Sequelize.BOOLEAN,
    employerName: Sequelize.STRING,
    employerCity: Sequelize.STRING,
    employerState: Sequelize.STRING,
    bedsInFacility: Sequelize.INTEGER,
    bedCount: Sequelize.INTEGER,
    teachingFacility: Sequelize.BOOLEAN,
    traumaFacility: Sequelize.BOOLEAN,
    magnetFacility: Sequelize.BOOLEAN,
    jobTypeCode: Sequelize.STRING,
    nurseToPatientRatio: Sequelize.STRING,
    chargeExp: Sequelize.BOOLEAN,
    shift: Sequelize.STRING,
    referenceName: Sequelize.STRING,
    referenceTitle: Sequelize.STRING,
    referenceEmail: Sequelize.STRING,
    referencePhone: Sequelize.STRING,
    referenceContact: Sequelize.BOOLEAN,
    reasonForLeaving: Sequelize.STRING,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    reference: Sequelize.JSON,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    WorkHistory,
    fetchAll: async() => {
        try {
            let workHistory = await WorkHistory.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: Profession,
                    attributes: ["professionName"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: Specialty,
                    attributes: ["specialtyName"],
                    where: {
                        isActive: true
                    }
                }]
            });
            return workHistory;
        } catch (error) {
            console.log('=============WorkHistory fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(workHistoryId) => {
        try {
            let workHistory = await WorkHistory.findOne({
                where: {
                    id: workHistoryId,
                    userId: {
                        [Sequelize.Op.ne]: null
                    },
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }]
            });
            return workHistory;
        } catch (error) {
            console.log('=============WorkHistory fetch by id error ==========', error);
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let workHistories = await WorkHistory.findAll({
                where: {
                    userId: userId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        id: userId,
                        isActive: true
                    }
                }]
            });
            return workHistories;
        } catch (error) {
            console.log("=============== WorkHistory fetch by userId ================", error);
            return null;
        }
    },
    update: async(workHistoryData) => {
        let success = false;
        try {
            let workHistory = await WorkHistory.findOne({
                where: {
                    id: workHistoryData.workHistoryId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (workHistory) {
                console.log('================= WorkHistory found for update ============');
                workHistory.userId = workHistoryData.userId;
                workHistory.startDate = workHistoryData.startDate;
                workHistory.endDate = workHistoryData.endDate;
                workHistory.currentlyWorking = workHistoryData.currentlyWorking;
                workHistory.employerName = workHistoryData.employerName;
                workHistory.employerCity = workHistoryData.employerCity;
                workHistory.employerState = workHistoryData.employerState;
                workHistory.bedsInFacility = workHistoryData.bedsInFacility ? workHistoryData.bedsInFacility : null;
                workHistory.bedCount = workHistoryData.bedCount ? workHistoryData.bedCount : null;
                workHistory.teachingFacility = workHistoryData.teachingFacility ? workHistoryData.teachingFacility : null;
                workHistory.traumaFacility = workHistoryData.traumaFacility ? workHistoryData.traumaFacility : null;
                workHistory.magnetFacility = workHistoryData.magnetFacility ? workHistoryData.magnetFacility : null;
                workHistory.professionId = workHistoryData.professionId;
                workHistory.specialtyId = workHistoryData.specialtyId ? workHistoryData.specialtyId : null;
                workHistory.jobTypeCode = workHistoryData.jobTypeCode;
                workHistory.nurseToPatientRatio = workHistoryData.nurseToPatientRatio ? workHistoryData.nurseToPatientRatio : null;
                workHistory.chargeExp = workHistoryData.chargeExp ? workHistoryData.chargeExp : null;
                workHistory.shift = workHistoryData.shift ? workHistoryData.shift : null;
                workHistory.referenceName = workHistoryData.referenceName;
                workHistory.referenceTitle = workHistoryData.referenceTitle;
                workHistory.referenceEmail = workHistoryData.referenceEmail;
                workHistory.referencePhone = workHistoryData.referencePhone;
                workHistory.referenceContact = workHistoryData.referenceContact ? workHistoryData.referenceContact : null;
                workHistory.reasonForLeaving = workHistoryData.reasonForLeaving ? workHistoryData.reasonForLeaving : null;
                WorkHistory.updatedBy = workHistoryData.adminId ? workHistoryData.adminId : workHistoryData.userId;

                await workHistory.save();
                success = true;
            }
            return { success, workHistory };
        } catch (error) {
            console.log('=============WorkHistory update error ==========', error);
            return { success: false };
        }
    },
    delete: async(workHistoryId) => {
        let success = false;
        try {
            let workHistory = await WorkHistory.findOne({
                where: {
                    id: workHistoryId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (workHistory) {
                console.log('================= WorkHistory found for delete ============');
                workHistory.isActive = false;
                await workHistory.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============WorkHistory delete error ==========', error);
            return false;
        }
    },
    create: async(workHistoryData) => {
        let success = false;
        try {
            let workHistory = await WorkHistory.create({
                id: uuid(),
                userId: workHistoryData.userId,
                employerId: workHistoryData.employerId ? workHistoryData.employerId : null,
                startDate: workHistoryData.startDate,
                endDate: workHistoryData.endDate,
                professionId: workHistoryData.professionId ? workHistoryData.professionId : null,
                specialtyId: workHistoryData.specialtyId ? workHistoryData.specialtyId : null,
                currentlyWorking: workHistoryData.currentlyWorking ? workHistoryData.currentlyWorking : null,
                employerName: workHistoryData.employerName ? workHistoryData.employerName : null,
                employerCity: workHistoryData.employerCity,
                employerState: workHistoryData.employerState,
                bedsInFacility: workHistoryData.bedsInFacility ? workHistoryData.bedsInFacility : null,
                bedCount: workHistoryData.bedCount ? workHistoryData.bedCount : null,
                teachingFacility: workHistoryData.teachingFacility ? workHistoryData.teachingFacility : null,
                traumaFacility: workHistoryData.traumaFacility ? workHistoryData.traumaFacility : null,
                magnetFacility: workHistoryData.magnetFacility ? workHistoryData.magnetFacility : null,
                jobTypeCode: workHistoryData.jobTypeCode ? workHistoryData.jobTypeCode : null,
                nurseToPatientRatio: workHistoryData.nurseToPatientRatio ? workHistoryData.nurseToPatientRatio : null,
                chargeExp: workHistoryData.chargeExp ? workHistoryData.chargeExp : null,
                shift: workHistoryData.shift,
                referenceName: workHistoryData.referenceName,
                referenceTitle: workHistoryData.referenceTitle,
                referenceEmail: workHistoryData.referenceEmail,
                referencePhone: workHistoryData.referencePhone,
                referenceContact: workHistoryData.referenceContact ? workHistoryData.referenceContact : null,
                reasonForLeaving: workHistoryData.reasonForLeaving ? workHistoryData.reasonForLeaving : null,
                createdBy: workHistoryData.adminId ? workHistoryData.adminId : workHistoryData.userId,
                isActive: true
            });
            if (workHistory) {
                console.log('================= WorkHistory created ============');
                success = true;
            }
            return {
                workHistory,
                success
            };
        } catch (error) {
            console.log('=============WorkHistory created error ==========', error);
            return { success: false };
        }
    }
};