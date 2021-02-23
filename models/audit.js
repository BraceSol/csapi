const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const Audits = sequelize.define('employerAudits', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    title: Sequelize.STRING,
    purpose: Sequelize.STRING,
    description: Sequelize.STRING,
    isRandom: Sequelize.BOOLEAN,
    employeeCount: Sequelize.INTEGER,
    employeeFilter: Sequelize.JSON,
    startDate: Sequelize.DATE,
    completeDate: Sequelize.DATE,
    initialScore: Sequelize.FLOAT,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    Audits,
    fetchAll: async(filterData) => {
        try {
            let queryObject = {};
            queryObject.where = {};
            queryObject.where.isActive = 1;
            if (filterData.employerId) {
                queryObject.where.employerId = filterData.employerId;
            }
            let audit = await Audits.findAll({
                where: queryObject.where
            });
            return audit;
        } catch (error) {
            console.log("========Audit findAll Error was accurs=====", error);
            return [];
        };
    },
    fetchById: async(auditId) => {
        try {
            let audit = await Audits.findOne({
                where: {
                    id: auditId,
                    isActive: true
                }
            })
            return audit;
        } catch (error) {
            console.log("========Audit findOne was error accurs====", error);
            return 0;
        }
    },
    fetchAllByUserId: async(userId) => {

    },
    update: async(auditData) => {
        let success = false;
        try {
            let audit = await Audits.findOne({
                where: {
                    id: auditData.employerAuditId,
                    isActive: true
                }
            });
            if (audit) {
                console.log("=========Audit found for update========");
                audit.title = auditData.title;
                audit.purpose = auditData.purpose;
                audit.description = auditData.description;
                audit.isRandom = auditData.isRandom;
                audit.employeeCount = auditData.employeeCount;
                audit.employeeFilter = auditData.employeeFilter ? auditData.employeeFilter : null;
                audit.startDate = auditData.startDate;
                audit.completeDate = auditData.completeDate;
                audit.initialScore = auditData.initialScore;
                audit.employerId = auditData.employerId;
                await audit.save();
                success = true;
            }
            return { audit, success }
        } catch (error) {
            console.log("=======Audits for updating error was accurs", error);
            return { success: false };
        }
    },
    delete: async(auditId) => {
        let success = false;
        try {
            let audit = await Audits.findOne({
                where: {
                    id: auditId,
                    isActive: true
                }
            });
            if (audit) {
                console.log('================= Documents found for delete ============');
                audit.isActive = false;
                await audit.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Documents delete error ==========', error);
            return false;
        }
    },
    create: async(auditData) => {
        let success = false;
        try {
            let audit = await Audits.create({
                id: uuid(),
                title: auditData.title,
                purpose: auditData.purpose,
                description: auditData.description,
                isRandom: auditData.isRandom,
                employeeCount: auditData.employeeCount,
                employeeFilter: auditData.employeeFilter ? auditData.employeeFilter : null,
                startDate: auditData.startDate,
                completeDate: auditData.completeDate,
                initialScore: auditData.initialScore,
                createdBy: auditData.adminId ? auditData.adminId : auditData.employerId,
                employerId: auditData.employerId,
                isActive: true
            });
            if (audit) {
                console.log('================= Audit created ============');
                success = true;
            }
            return {
                audit,
                success
            };
        } catch (error) {
            console.log('=============Audit created error ==========', error);
            return { success: false };
        }
    }

}