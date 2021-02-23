const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { DocumentType } = require("./documentTypes");

const DocumentTypeRule = sequelize.define('documentTypeRules', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    ruleQuery: Sequelize.STRING,
    ruleConfig: Sequelize.JSON,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
    statusCode: Sequelize.INTEGER,
});
module.exports = {
    DocumentTypeRule,
    fetchAll: async() => {
        try {
            let documentTypeRule = await DocumentTypeRule.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: DocumentType,
                    attributes: ["documentName"],
                    where: {
                        isActive: true,
                        id: {
                            [Sequelize.Op.ne]: null
                        }
                    }
                }]
            });
            return documentTypeRule;
        } catch (error) {
            console.log('=============DocumentTypeRule fetch all error ==========', error);
            return [];
        }
    },
    fetchAllByDocumentType: async(docTypeId) => {
        try {
            let documentTypeRule = await DocumentTypeRule.findAll({
                where: {
                    isActive: true,
                    documentTypeId: docTypeId
                },
                include: [{
                    model: DocumentType,
                    attributes: ["documentName"],
                    where: {
                        isActive: true,
                        id: {
                            [Sequelize.Op.ne]: null
                        }
                    }
                }]
            });
            return documentTypeRule;
        } catch (error) {
            console.log('=============DocumentTypeRule fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(documentTypeRuleId) => {
        try {
            let documentTypeRule = await DocumentTypeRule.findOne({
                where: {
                    id: documentTypeRuleId,
                    isActive: true
                },
                include: [{
                    model: DocumentType,
                    attributes: ["documentName"],
                    where: {
                        isActive: true,
                        id: {
                            [Sequelize.Op.ne]: null
                        }
                    }
                }]
            });
            return documentTypeRule;
        } catch (error) {
            console.log('=============DocumentTypeRule fetch by id error ==========', error);
        }
    },
    update: async(documentTypeRuleData) => {
        let success = false;
        try {
            let documentTypeRule = await DocumentTypeRule.findOne({
                where: {
                    id: documentTypeRuleData.documentTypeRuleId,
                    isActive: true
                },
                include: [{
                    model: DocumentType,
                    attributes: ["documentName"],
                    where: {
                        isActive: true,
                        id: {
                            [Sequelize.Op.ne]: null
                        }
                    }
                }]
            });
            if (documentTypeRule) {
                console.log('================= DocumentTypeRule found for update ============');
                documentTypeRule.documentTypeId = documentTypeRuleData.documentTypeId;
                documentTypeRule.professionId = documentTypeRuleData.professionId;
                documentTypeRule.specialtyId = documentTypeRuleData.specialtyId;
                documentTypeRule.title = documentTypeRuleData.title;
                documentTypeRule.description = documentTypeRuleData.description;
                documentTypeRule.ruleQuery = documentTypeRuleData.ruleQuery;
                documentTypeRule.ruleConfig = documentTypeRuleData.ruleConfig;
                documentTypeRule.statusCode = documentTypeRuleData.statusCode;
                documentTypeRule.updatedBy = documentTypeRuleData.adminId;
                await documentTypeRule.save();
                success = true;
            }
            return { success, documentTypeRule };
        } catch (error) {
            console.log('=============DocumentTypeRule update error ==========', error);
            return { success: false };
        }
    },
    delete: async(documentTypeRuleId) => {
        let success = false;
        try {
            let documentTypeRule = await DocumentTypeRule.findOne({
                where: {
                    id: documentTypeRuleId,
                    isActive: true
                },
                include: [{
                    model: DocumentType,
                    attributes: ["documentName"],
                    where: {
                        isActive: true,
                        id: {
                            [Sequelize.Op.ne]: null
                        }
                    }
                }]
            });
            if (documentTypeRule) {
                console.log('================= DocumentTypeRule found for delete ============');
                documentTypeRule.isActive = false;
                await documentTypeRule.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============DocumentTypeRule delete error ==========', error);
            return false;
        }
    },
    create: async(documentTypeRuleData) => {
        let success = false;
        try {
            let documentTypeRule = await DocumentTypeRule.create({
                id: uuid(),
                title: documentTypeRuleData.title,
                professionId: documentTypeRuleData.professionId,
                specialtyId: documentTypeRuleData.specialtyId,
                departmentId: documentTypeRuleData.departmentId ? documentTypeRuleData.departmentId : null,
                documentTypeId: documentTypeRuleData.documentTypeId,
                description: documentTypeRuleData.description,
                ruleQuery: documentTypeRuleData.ruleQuery,
                ruleConfig: documentTypeRuleData.ruleConfig,
                createdBy: documentTypeRuleData.adminId,
                statusCode: documentTypeRuleData.statusCode,
                isActive: true
            });
            if (documentTypeRule) {
                console.log('================= DocumentTypeRule created ============');
                success = true;
            }
            return {
                documentTypeRule,
                success
            };
        } catch (error) {
            console.log('=============DocumentTypeRule created error ==========', error);
            return { success: false };
        }
    }
};