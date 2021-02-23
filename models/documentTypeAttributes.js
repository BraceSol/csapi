const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { DocumentType } = require("./documentTypes");
const DocumentTypeAttribute = sequelize.define('documentTypeAttributes', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    attributeName: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    attributeType: Sequelize.STRING,
    helpText: Sequelize.STRING,
    defaultValue: Sequelize.STRING,
    minLength: Sequelize.INTEGER,
    maxLength: Sequelize.INTEGER,
    fieldOptions: Sequelize.JSON,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    statusCode: Sequelize.INTEGER,
    isMultiSelect: Sequelize.BOOLEAN,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    DocumentTypeAttribute,
    fetchAll: async() => {
        try {
            let documentTypeAttributes = await DocumentTypeAttribute.findAll({
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
            return documentTypeAttributes;
        } catch (error) {
            console.log('=============DocumentType Attributes fetch all error ==========', error);
            return [];
        }
    },
    fetchAllByDocumentTypeId: async(documentTypeId) => {
        try {
            let documentTypeAttributes = await DocumentTypeAttribute.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: DocumentType,
                    attributes: ["documentName"],
                    where: {
                        isActive: true,
                        id: {
                            [Sequelize.Op.ne]: null,
                            [Sequelize.Op.eq]: documentTypeId
                        }
                    }
                }]
            });
            return documentTypeAttributes;
        } catch (error) {
            console.log('=============DocumentType Attributes fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(docAttributeId) => {
        try {
            let documentTypeAttributes = await DocumentTypeAttribute.findOne({
                where: {
                    id: docAttributeId,
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
            return documentTypeAttributes;
        } catch (error) {
            console.log('=============DocumentType Attributes fetch by id error ==========', error);
        }
    },
    update: async(documentTypeAttributesData) => {
        let success = false;
        try {
            let documentTypeAttributes = await DocumentTypeAttribute.findOne({
                where: {
                    id: documentTypeAttributesData.documentTypeAttributeId,
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
            if (documentTypeAttributes) {
                console.log('================= DocumentType Attributes found for update ============');
                documentTypeAttributes.documentTypeId = documentTypeAttributesData.documentTypeId;
                documentTypeAttributes.attributeName = documentTypeAttributesData.attributeName;
                documentTypeAttributes.description = documentTypeAttributesData.description;
                documentTypeAttributes.statusCode = documentTypeAttributesData.statusCode;
                documentTypeAttributes.title = documentTypeAttributesData.title;
                documentTypeAttributes.minLength = documentTypeAttributesData.minLength;
                documentTypeAttributes.isMultiSelect = documentTypeAttributesData.isMultiSelect;
                documentTypeAttributes.attributeType = documentTypeAttributesData.attributeType;
                documentTypeAttributes.helpText = documentTypeAttributesData.helpText;
                documentTypeAttributes.defaultValue = documentTypeAttributesData.defaultValue;
                documentTypeAttributes.maxLength = documentTypeAttributesData.maxLength;
                documentTypeAttributes.fieldOptions = documentTypeAttributesData.fieldOptions;
                documentTypeAttributes.updatedBy = documentTypeAttributesData.adminId;
                await documentTypeAttributes.save();
                success = true;
            }
            return { success, documentTypeAttributes };
        } catch (error) {
            console.log('=============DocumentType Attributes update error ==========', error);
            return { success: false };
        }
    },
    delete: async(docAttributeId) => {
        let success = false;
        try {
            let documentTypeAttributes = await DocumentTypeAttribute.findOne({
                where: {
                    id: docAttributeId,
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
            if (documentTypeAttributes) {
                console.log('================= DocumentType Attributes found for delete ============');
                documentTypeAttributes.isActive = false;
                await documentTypeAttributes.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============DocumentType Attributes delete error ==========', error);
            return false;
        }
    },
    create: async(documentTypeAttributesData) => {
        let success = false;
        try {
            let documentTypeAttributes = await DocumentTypeAttribute.create({
                id: uuid(),
                documentTypeId: documentTypeAttributesData.documentTypeId,
                attributeName: documentTypeAttributesData.attributeName,
                title: documentTypeAttributesData.title,
                attributeType: documentTypeAttributesData.attributeType,
                helpText: documentTypeAttributesData.helpText,
                defaultValue: documentTypeAttributesData.defaultValue,
                maxLength: documentTypeAttributesData.maxLength,
                fieldOptions: documentTypeAttributesData.fieldOptions,
                createdBy: documentTypeAttributesData.adminId,
                description: documentTypeAttributesData.description,
                minLength: documentTypeAttributesData.minLength,
                isMultiSelect: documentTypeAttributesData.isMultiSelect,
                statusCode: documentTypeAttributesData.statusCode,
                isActive: true
            });
            if (documentTypeAttributes) {
                console.log('================= DocumentType Attributes created ============');
                success = true;
            }
            return {
                documentTypeAttributes,
                success
            };
        } catch (error) {
            console.log('=============DocumentType Attributes created error ==========', error);
            return { success: false };
        }
    }
};