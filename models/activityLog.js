const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const ActivityLog = sequelize.define('activityLog', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    entityId: Sequelize.STRING,
    entityType: Sequelize.STRING,
    activityCategory: Sequelize.STRING,
    activityTitle: Sequelize.STRING,
    description: Sequelize.STRING,
    ipAddress: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    ActivityLog,
    fetchAll: async() => {
        try {
            let activityLog = await ActivityLog.findAll({
                where: {
                    isActive: true
                }
            });
            return activityLog;
        } catch (error) {
            console.log('=============ActivityLog fetch all error ==========', error);
            return [];
        }
    },
    fetchAllByEntity: async(userId) => {
        try {
            let activityLog = await ActivityLog.findAll({
                where: {
                    isActive: true,
                    entityId: userId
                }
            });
            return activityLog;
        } catch (error) {
            console.log('=============ActivityLog fetch all by entity error ==========', error);
            return [];
        }
    },
    fetchById: async(logId) => {
        try {
            let activityLog = await ActivityLog.findOne({
                where: {
                    id: logId,
                    isActive: true
                }
            });
            return activityLog;
        } catch (error) {
            console.log('=============ActivityLog fetch by id error ==========', error);
        }
    },
    update: async(activityLogData) => {
        let success = false;
        try {
            let activityLog = await ActivityLog.findOne({
                where: {
                    id: activityLogData.logId,
                    isActive: true
                }
            });
            if (activityLog) {
                console.log('================= ActivityLog found for update ============');
                activityLog.entityType = activityLogData.entityType;
                activityLog.entityId = activityLogData.entityId;
                activityLog.activityCategory = activityLogData.activityCategory;
                activityLog.activityTitle = activityLogData.activityTitle;
                activityLog.description = activityLogData.description;
                activityLog.ipAddress = activityLogData.ipAddress;
                activityLog.isActive = activityLogData.isActive;
                await activityLog.save();
                success = true;
            }
            return { success, activityLog };
        } catch (error) {
            console.log('=============ActivityLog update error ==========', error);
            return { success: false };
        }
    },
    delete: async(logId) => {
        let success = false;
        try {
            let activityLog = await ActivityLog.findOne({
                where: {
                    id: logId,
                    isActive: true
                }
            });
            if (activityLog) {
                console.log('================= ActivityLog found for delete ============');
                activityLog.isActive = false;
                await activityLog.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============ActivityLog delete error ==========', error);
            return false;
        }
    },
    create: async(activityLogData) => {
        let success = false;
        try {
            let activityLog = await ActivityLog.create({
                id: uuid(),
                entityType: activityLogData.entityType,
                entityId: activityLogData.entityId,
                activityCategory: activityLogData.activityCategory,
                activityTitle: activityLogData.activityTitle,
                description: activityLogData.description,
                ipAddress: activityLogData.ipAddress,
                isActive: true
            });
            if (activityLog) {
                console.log('================= activityLog created ============');
                success = true;
            }
            return {
                activityLog,
                success
            };
        } catch (error) {
            console.log('=============activityLog created error ==========', error);
            return { success: false };
        }
    }
};