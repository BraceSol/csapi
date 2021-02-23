const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const Employer = sequelize.define('employer', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    employerName: Sequelize.STRING,
    cmsCertificationId: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    website: Sequelize.STRING,
    facilityType: Sequelize.STRING,
    typeOfControl: Sequelize.STRING,
    traumaLevel: Sequelize.STRING,
    totalBeds: Sequelize.INTEGER,
    totalEmployees: Sequelize.INTEGER,
    travelEmployees: Sequelize.INTEGER,
    perdiemEmployees: Sequelize.INTEGER,
    teachingFacility: Sequelize.BOOLEAN,
    joinCommissionStatus: Sequelize.DATE,
    jointCommissionDate: Sequelize.DATE,
    addressLine1: Sequelize.STRING,
    addressLine2: Sequelize.STRING,
    addressLine3: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    createBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    Employer,
    fethcAll: async() => {
        try {
            let employer = await Employer.findAll({
                where: {
                    isActive: true
                }
            });
            return employer;
        } catch (error) {
            console.log("========Employer findAll Error was accurs=====", error);
            return [];
        };
    },
    fetchById: async(employerId) => {
        try {
            let employer = await Employer.findOne({
                where: {
                    id: employerId,
                    isActive: true
                }
            })
            return employer;
        } catch (error) {
            console.log("========Employer findOne was error accurs====", error);
            return 0;
        }
    },
    fetchEmployerBySearch: async(data) => {
        try {
            let employer = await Employer.findOne({
                where: {
                    employerName: data.employerName,
                    city: data.employerCity,
                    state: data.employerState,
                    postalCode: data.employerPostalCode,
                    isActive: true
                }
            })
            return employer;
        } catch (error) {
            console.log("========Employer findOne by search was error accurs====", error);
            return 0;
        }
    },
    fetchAllByUserId: async(userId) => {

    },
    update: async(employerData) => {
        let success = false;
        try {
            let employer = await Employer.findOne({
                where: {
                    id: employerData.employerId,
                    isActive: true
                }
            });
            if (employer) {
                console.log("=========Employer found for update========");
                employer.employerName = employerData.employerName,
                    employer.cmsCertificationId = employerData.cmsCertificationId ? employerData.cmsCertificationId : null,
                    employer.phoneNumber = employerData.phoneNumber,
                    employer.website = employerData.website ? employerData.website : null,
                    employer.facilityType = employerData.facilityType ? employerData.facilityType : null,
                    employer.typeOfControl = employerData.typeOfControl ? employerData.typeOfControl : null,
                    employer.traumaLevel = employerData.traumaLevel ? employerData.traumaLevel : null,
                    employer.totalBeds = employerData.totalBeds,
                    employer.totalEmployees = employerData.totalEmployees,
                    employer.travelEmployees = employerData.travelEmployees,
                    employer.perdiemEmployees = employerData.perdiemEmployees,
                    employer.teachingFacility = employerData.teachingFacility,
                    employer.joinCommissionStatus = employerData.joinCommissionStatus,
                    employer.jointCommissionDate = employerData.jointCommissionDate,
                    employer.addressLine1 = employerData.addressLine1,
                    employer.addressLine2 = employerData.addressLine2 ? employerData.addressLine2 : null,
                    employer.addressLine3 = employerData.addressLine3 ? employerData.addressLine3 : null,
                    employer.city = employerData.city,
                    employer.state = employerData.state,
                    employer.postalCode = employerData.postalCode,
                    employer.updatedBy = employerData.adminId;
                await employer.save();
                success = true;
            }
            return { employer, success }
        } catch (error) {
            console.log("=======Documents for updating error was accurs", error);
            return { success: false };
        }
    },
    delete: async(employerId) => {
        let success = false;
        try {
            let employer = await Employer.findOne({
                where: {
                    id: employerId,
                    isActive: true
                }
            });
            if (employer) {
                console.log('================= Documents found for delete ============');
                employer.isActive = false;
                await employer.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Documents delete error ==========', error);
            return false;
        }
    },
    create: async(employerData) => {
        let success = false;
        try {
            let employer = await Employer.create({
                id: uuid(),
                employerName: employerData.employerName,
                cmsCertificationId: employerData.cmsCertificationId ? employerData.cmsCertificationId : null,
                phoneNumber: employerData.phoneNumber,
                website: employerData.website ? employerData.website : null,
                facilityType: employerData.facilityType ? employerData.facilityType : null,
                typeOfControl: employerData.typeOfControl ? employerData.typeOfControl : null,
                traumaLevel: employerData ? employerData.traumaLevel : null,
                totalBeds: employerData.totalBeds,
                totalEmployees: employerData.totalEmployees,
                travelEmployees: employerData.travelEmployees,
                perdiemEmployees: employerData.perdiemEmployees,
                teachingFacility: employerData.teachingFacility,
                joinCommissionStatus: employerData.joinCommissionStatus,
                jointCommissionDate: employerData.jointCommissionDate,
                addressLine1: employerData.addressLine1,
                addressLine2: employerData.addressLine2 ? employerData.addressLine2 : null,
                addressLine3: employerData.addressLine3 ? employerData.addressLine3 : null,
                city: employerData.city,
                state: employerData.state,
                postalCode: employerData.postalCode,
                createBy: employerData.adminId,
                isActive: true
            });
            if (employer) {
                console.log('================= Employer created ============');
                success = true;
            }
            return {
                employer,
                success
            };
        } catch (error) {
            console.log('=============Employer created error ==========', error);
            return { success: false };
        }
    }

}