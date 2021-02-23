const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const Queues = sequelize.define('queues', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    isSystem: Sequelize.INTEGER,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    queueType: Sequelize.INTEGER,
    stats: Sequelize.JSON,
    ownerId: Sequelize.STRING,
    statusCode: Sequelize.INTEGER,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    assignedTo: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    Queues,
    fetchAll: async(filterData) => {
        try {
            let queryObject = {};
            queryObject.where = {};
            queryObject.where.isActive = 1;
            if (filterData.employerId) {
                queryObject.where.employerId = filterData.employerId;
            }
            if (filterData.isSystem) {
                queryObject.where.isSystem = filterData.isSystem;
            }
            let queue = await Queues.findAll({
                where: queryObject.where
            });
            return queue;
        } catch (error) {
            console.log("========Queue findAll Error was accurs=====", error);
            return [];
        };
    },
    fetchById: async(queueId) => {
        try {
            let queue = await Queues.findOne({
                where: {
                    id: queueId,
                    isActive: true
                }
            })
            return queue;
        } catch (error) {
            console.log("========Queue findOne was error accurs====", error);
            return 0;
        }
    },
    fetchAllByUserId: async(userId) => {

    },
    update: async(queueData) => {
        let success = false;
        try {
            let queue = await Queues.findOne({
                where: {
                    id: queueData.queueId,
                    isActive: true
                }
            });
            if (queue) {
                console.log("=========Queue found for update========");
                queue.isSystem = queueData.isSystem;
                queue.title = queueData.title;
                queue.description = queueData.description;
                queue.queueType = queueData.queueType;
                queue.stats = queueData.stats ? queueData.stats : null;
                queue.ownerId = queueData.ownerId;
                queue.statusCode = queueData.statusCode ? queueData.statusCode : null;
                queue.updatedBy = queueData.adminId;
                queue.assignedTo = queueData.assignedTo;
                queue.employerId = queueData.employerId;
                await queue.save();
                success = true;
            }
            return { queue, success }
        } catch (error) {
            console.log("=======Queues for updating error was accurs", error);
            return { success: false };
        }
    },
    updateQueueStatus: async(queueData) => {
        let success = false;
        try {
            let queue = await Queues.findOne({
                where: {
                    id: queueData.queueId,
                    isActive: true
                }
            });
            if (queue) {
                console.log("=========Queue found for update========");
                queue.isSystem = queueData.isSystem;
                queue.statusCode = queueData.queueStatus;
                queue.updatedBy = queueData.adminId;
                await queue.save();
                success = true;
            }
            return { queue, success }
        } catch (error) {
            console.log("=======Queues for updating error was accurs", error);
            return { success: false };
        }
    },
    delete: async(queueId) => {
        let success = false;
        try {
            let queue = await Queues.findOne({
                where: {
                    id: queueId,
                    isActive: true
                }
            });
            if (queue) {
                console.log('================= Queues found for delete ============');
                queue.isActive = false;
                await queue.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Queues delete error ==========', error);
            return false;
        }
    },
    create: async(queueData) => {
        let success = false;
        try {
            let queue = await Queues.create({
                id: uuid(),
                isSystem: queueData.isSystem,
                title: queueData.title,
                description: queueData.description,
                queueType: queueData.queueType,
                stats: queueData.stats ? queueData.stats : null,
                ownerId: queueData.ownerId,
                createdBy: queueData.userId,
                statusCode: queueData.statusCode,
                assignedTo: queueData.assignedTo,
                employerId: queueData.employerId,
                isActive: true
            });
            if (queue) {
                console.log('================= Queue created ============');
                success = true;
            }
            return {
                queue,
                success
            };
        } catch (error) {
            console.log('=============Queue created error ==========', error);
            return { success: false };
        }
    }

}