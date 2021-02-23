const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { User } = require("./user");
const { Queues } = require("./queue");
const { Document } = require('./documents');
const Upload = sequelize.define('uploads', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    pageDetail: Sequelize.JSON,
    storePath: Sequelize.STRING,
    pctComplete: Sequelize.FLOAT,
    filename: Sequelize.STRING,
    statusCode: Sequelize.INTEGER,
    createBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    assignedTo: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    Upload,
    fetchAll: async(filterData) => {
        try {
            let queryObject = {};
            let queueRequired = false;
            queryObject.where = {};
            queryObject.where.isActive = 1;
            if (filterData.queueId) {
                queryObject.where.queueId = filterData.queueId;
                queueRequired = true;
            }
            if (filterData.userId) {
                queryObject.where.userId = filterData.userId;
            }
            let upload = await Upload.findAll({
                where: queryObject.where,
                include: [{
                    model: Queues,
                    attributes: ["id", "title"],
                    where: {
                        isActive: true
                    },
                    required: queueRequired
                }, {
                    model: User,
                    attributes: ["id", "firstName", "lastName"],
                    where: {
                        isActive: true
                    },
                    required: false
                }]
            });
            return upload;
        } catch (error) {
            console.log("========Upload findAll Error was accurs=====", error);
            return [];
        };
    },
    fetchById: async(uploadId) => {
        try {
            let upload = await Upload.findOne({
                where: {
                    id: uploadId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["id", "firstName", "lastName"],
                    where: {
                        isActive: true
                    }
                }]
            })
            return upload;
        } catch (error) {
            console.log("========Upload findOne was error accurs====", error);
            return 0;
        }
    },
    fetchByQueueId: async(queueId) => {
        try {
            let upload = await Upload.findOne({
                where: {
                    queueId: queueId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["id", "firstName", "lastName"],
                    where: {
                        isActive: true
                    }
                }]
            })
            return upload;
        } catch (error) {
            console.log("========Upload find by queueId error accurs====", error);
            return 0;
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let uploads = await Upload.findAll({
                where: {
                    userId: userId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["id", "firstName", "lastName"],
                    where: {
                        isActive: true
                    }
                }, {
                    model: Document,
                    where: {
                        isActive: true
                    }
                }]
            })
            return uploads;
        } catch (error) {
            console.log("======= upload fetch all by user id error ======", error);
            return 0;
        }
    },
    update: async(documentData) => {
        let success = false;
        try {
            let upload = await Upload.findOne({
                where: {
                    id: documentData.uploadId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["id", "firstName", "lastName"],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (upload) {
                console.log("=========Upload found for update========");
                upload.pageDetail = documentData.pageDetail ? documentData.pageDetail : null;
                upload.storePath = documentData.storePath;
                upload.pctComplete = documentData.pctComplete ? documentData.pctComplete : null;
                upload.storePath = documentData.storePath;
                upload.filename = documentData.filename;
                upload.queueId = documentData.queueId ? documentData.queueId : null,
                    upload.statusCode = documentData.statusCode ? documentData.statusCode : null;
                upload.updatedBy = documentData.adminId;
                await upload.save();
                success = true;
            }
            return { upload, success }
        } catch (error) {
            console.log("=======Documents for updating error was accurs", error);
            return { success: false };
        }
    },
    updateQueueId: async(data) => {
        try {
            let success = false;
            let upload = await Upload.findOne({
                where: {
                    id: data.id,
                    isActive: true
                }
            });
            if (upload) {
                upload.queueId = data.queueId;
                await upload.save();
                success = true;
            }
            return { upload, success };
        } catch (error) {
            console.log("=======Documents for updating queue id error was accurs", error);
            return { success: false };
        }
    },
    delete: async(uploadId) => {
        let success = false;
        try {
            let upload = await Upload.findOne({
                where: {
                    id: uploadId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["id", "firstName", "lastName"],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (upload) {
                console.log('================= Documents found for delete ============');
                upload.isActive = false;
                await Upload.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Documents delete error ==========', error);
            return false;
        }
    },
    create: async(documentData) => {
        let success = false;
        try {
            let upload = await Upload.create({
                id: uuid(),
                pageDetail: documentData.attributeAnswers ? documentData.attributeAnswers : null,
                storePath: documentData.storePath,
                pctComplete: documentData.pctComplete ? documentData.pageDetail : null,
                filename: documentData.filename,
                storePath: documentData.storePath,
                userId: documentData.userId,
                queueId: documentData.queueId ? documentData.queueId : null,
                statusCode: documentData.statusCode ? documentData.statusCode : null,
                createBy: documentData.adminId ? documentData.adminId : documentData.userId,
                isActive: true
            });
            if (upload) {
                console.log('================= Upload created ============');
                success = true;
            }
            return {
                upload,
                success
            };
        } catch (error) {
            console.log('=============Upload created error ==========', error);
            return { success: false };
        }
    }

}