const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { Upload } = require('./uploads');
const Document = sequelize.define('documents', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    storePath: Sequelize.STRING,
    filename: Sequelize.STRING,
    statusCode: Sequelize.INTEGER,
    createBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    Document,
    fethcAll: async() => {
        try {
            let document = await Document.findAll({
                where: {
                    isActive: true
                }
            });
            return document;
        } catch (error) {
            console.log("========Document findAll Error was accurs=====", error);
            return [];
        };
    },
    fetchById: async(documentId) => {
        try {
            let document = await Document.findOne({
                where: {
                    id: documentId,
                    isActive: true
                }
            })
        } catch (error) {
            console.log("========Document findOne was error accurs====", error);
            return 0;
        }
    },
    fetchByUserId: async(userId) => {
        try {
            let documents = await Document.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: Upload,
                    where: {
                        isActive: true,
                        userId: userId
                    }
                }]
            })
            return documents;
        } catch (error) {
            console.log("========Document find by userID was error accurs====", error);
            return 0;
        }
    },
    update: async(documentData) => {
        let success = false;
        try {
            let document = await Document.findOne({
                where: {
                    id: documentData.documentId,
                    isActive: true
                }
            });
            if (document) {
                console.log("=========Document found for update========");
                document.userId = documentData.userId;
                document.uploadId = documentData.uploadId;
                document.documentTypeId = documentData.documentTypeId;
                document.storePath = documentData.storePath;
                document.filename = documentData.filename;
                document.statusCode = documentData.statusCode;
                document.createBy = documentData.createBy;
                document.updatedBy = documentData.updatedBy;
                document.isActive = documentData.isActive;
                await document.save();
                success = true;
            }
            return { document, success }
        } catch (error) {
            console.log("=======Documents for updating error was accurs", error);
            return { success: false };
        }
    },
    delete: async(documentId) => {
        let success = false;
        try {
            let document = await Document.findOne({
                where: {
                    id: documentId,
                    isActive: true
                }
            });
            if (document) {
                console.log('================= Documents found for delete ============');
                document.isActive = false;
                await document.save();
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
            let document = await Document.create({
                id: uuid(),
                entityId: documentData.entityId ? documentData.entityId : null,
                userId: documentData.userId,
                uploadId: documentData.uploadId,
                documentTypeId: documentData.documentTypeId,
                storePath: documentData.storePath,
                statusCode: documentData.statusCode,
                createBy: documentData.adminId ? documentData.adminId : documentData.userId,
                isActive: true
            });
            if (document) {
                console.log('================= Document created ============');
                success = true;
            }
            return {
                document,
                success
            };
        } catch (error) {
            console.log('=============Document created error ==========', error);
            return { success: false };
        }
    }

}