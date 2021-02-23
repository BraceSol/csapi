const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { User } = require("./user");
const { Employer } = require("./employer");
const { Profession } = require("./profession");
const { Specialty } = require("./specialty");

const ComplianceReport = sequelize.define('complianceReports', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    departmentId: Sequelize.STRING,
    locationId: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    initialScore: Sequelize.FLOAT,
    currentScore: Sequelize.FLOAT,
    missingDocs: Sequelize.INTEGER,
    totalDocs: Sequelize.INTEGER,
    expiringDocs: Sequelize.INTEGER,
    statusCode: Sequelize.INTEGER,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    ComplianceReport,
    fetchAll: async(filterData) => {
        try {
            let queryObject = {};
            queryObject.where = {};
            queryObject.where.isActive = 1;
            if (filterData.employerId) {
                queryObject.where.employerId = filterData.employerId;
            }
            if (filterData.userId) {
                queryObject.where.userId = filterData.userId;
            }
            if (filterData.firstName) {
                queryObject.where.User.firstName = filterData.firstName;
            }
            if (filterData.lastName) {
                queryObject.where.User.lastName = filterData.lastName;
            }
            let complianceReports = await ComplianceReport.findAll({
                where: queryObject.where,
                include: [{
                    model: Employer,
                    attributes: ["id", "employerName"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: User,
                    attributes: ["id", "firstName", "lastName"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: Profession,
                    attributes: ["id", "professionName"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: Specialty,
                    attributes: ["id", "specialtyName"],
                    where: {
                        isActive: true
                    }
                }]
            });
            return complianceReports;
        } catch (error) {
            console.log('=============ComplianceReport fetch all error ==========', error);
            return [];
        }
    },
    fetchAllByEmployerId: async(employerId) => {
        try {
            let complianceReports = await ComplianceReport.findAll({
                where: {
                    isActive: true,
                    employerId: employerId
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            return complianceReports;
        } catch (error) {
            console.log('=============ComplianceReport fetch all by employer error ==========', error);
            return [];
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let complianceReports = await ComplianceReport.findAll({
                where: {
                    isActive: true,
                    userId: userId
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            return complianceReports;
        } catch (error) {
            console.log('=============ComplianceReport fetch all by user error ==========', error);
            return [];
        }
    },
    fetchById: async(complianceReportId) => {
        try {
            let complianceReports = await ComplianceReport.findOne({
                where: {
                    id: complianceReportId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ["id", "employerName"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: User,
                    attributes: ["id", "firstName", "lastName"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: Profession,
                    attributes: ["id", "professionName"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: Specialty,
                    attributes: ["id", "specialtyName"],
                    where: {
                        isActive: true
                    }
                }]
            });
            return complianceReports;
        } catch (error) {
            console.log('=============ComplianceReport fetch by id error ==========', error);
        }
    },
    update: async(complianceReportsData) => {
        let success = false;
        try {
            let complianceReports = await ComplianceReport.findOne({
                where: {
                    id: complianceReportsData.complianceReportId,
                    isActive: true
                }
            });
            if (complianceReports) {
                console.log('================= ComplianceReport found for update ============');
                complianceReports.userId = complianceReportsData.userId;
                complianceReports.employerId = complianceReportsData.employerId;
                complianceReports.professionId = complianceReportsData.professionId;
                complianceReports.specialtyId = complianceReportsData.specialtyId;
                complianceReports.departmentId = complianceReportsData.departmentId;
                complianceReports.locationId = complianceReportsData.locationId;
                complianceReports.initialScore = complianceReportsData.initialScore;
                complianceReports.currentScore = complianceReportsData.currentScore;
                complianceReports.missingDocs = complianceReportsData.missingDocs;
                complianceReports.totalDocs = complianceReportsData.totalDocs;
                complianceReports.expiringDocs = complianceReportsData.expiringDocs;
                complianceReports.statusCode = complianceReportsData.statusCode;
                complianceReports.startDate = complianceReportsData.startDate;
                complianceReports.endDate = complianceReportsData.endDate;
                complianceReports.updatedBy = complianceReportsData.adminId ? complianceReports.adminId : null;
                await complianceReports.save();
                success = true;
            }
            return { success, complianceReports };
        } catch (error) {
            console.log('=============ComplianceReport update error ==========', error);
            return { success: false };
        }
    },
    delete: async(complianceReportId) => {
        let success = false;
        try {
            let complianceReports = await ComplianceReport.findOne({
                where: {
                    id: complianceReportId,
                    isActive: true
                }
            });
            if (complianceReports) {
                console.log('================= ComplianceReport found for delete ============');
                complianceReports.isActive = false;
                await complianceReports.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============ComplianceReport delete error ==========', error);
            return false;
        }
    },
    create: async(complianceReportsData) => {
        let success = false;
        try {
            let complianceReports = await ComplianceReport.create({
                id: uuid(),
                userId: complianceReportsData.userId,
                employerId: complianceReportsData.employerId,
                professionId: complianceReportsData.professionId,
                specialtyId: complianceReportsData.specialtyId,
                departmentId: complianceReportsData.departmentId,
                locationId: complianceReportsData.locationId,
                initialScore: complianceReportsData.initialScore,
                currentScore: complianceReportsData.currentScore,
                missingDocs: complianceReportsData.missingDocs,
                totalDocs: complianceReportsData.totalDocs,
                expiringDocs: complianceReportsData.expiringDocs,
                statusCode: complianceReportsData.statusCode,
                startDate: complianceReportsData.startDate,
                endDate: complianceReportsData.endDate,
                createdBy: complianceReportsData.userId ? complianceReportsData.userId : complianceReportsData.adminId,
                isActive: true
            });
            if (complianceReports) {
                console.log('================= ComplianceReport created ============');
                success = true;
            }
            return {
                complianceReports,
                success
            };
        } catch (error) {
            console.log('=============ComplianceReport created error ==========', error);
            return { success: false };
        }
    }
};