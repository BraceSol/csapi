const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { DocumentCategories } = require("./documentCategories");
const { EmployerDocTypes } = require("./employerDocTypes");

const DocumentType = sequelize.define('documentTypes', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    documentName: Sequelize.STRING,
    description: Sequelize.STRING,
    requirementLevel: Sequelize.INTEGER,
    prefix: Sequelize.STRING,
    exampleDocuments: Sequelize.JSON,
    references: Sequelize.JSON,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    statusCode: Sequelize.INTEGER,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    DocumentType,
    fetchAll: async() => {
        try {
            let documentTypes = await DocumentType.findAll({
                where: {
                    isActive: true,
                    documentCategoryId: {
                        [Sequelize.Op.ne]: null,
                    }
                },
                include: [{
                    model: DocumentCategories,
                    attribute: ['categoryName', 'description'],
                }]
            });
            return documentTypes;
        } catch (error) {
            console.log('=============Document Types fetch all error ==========', error);
            return [];
        }
    },
    fetchAllUnusedEmployerDocs: async(employerId) => {
        try {
            let documentTypes = await DocumentType.findAll({
                where: {
                    isActive: true,
                    documentCategoryId: {
                        [Sequelize.Op.ne]: null,
                    }
                },
                include: [{
                    model: EmployerDocTypes,
                    attribute: ['categoryName', 'description'],
                    where: {
                        isActive: true,
                        id: {
                            [Sequelize.Op.eq]: null,
                        }
                    },
                    required: false
                }]
            });
            return documentTypes;
        } catch (error) {
            console.log('=============Document Types fetch all error ==========', error);
            return [];
        }
    },
    fetchAllByCategoryId: async(documentCategoryId) => {
        try {
            let documentTypes = await DocumentType.findAll({
                where: {
                    isActive: true,
                    documentCategoryId: {
                        [Sequelize.Op.ne]: null,
                    }
                },
                include: [{
                    model: DocumentCategories,
                    attribute: ['categoryName', 'description'],
                    where: {
                        id: documentCategoryId
                    }
                }]
            });
            return documentTypes;
        } catch (error) {
            console.log('=============Document Types fetch all error ==========', error);
            return [];
        }
    },
    fetchExampleDocumentsById: async(docTypeId) => {
        try {
            let documentTypes = await DocumentType.findOne({
                where: {
                    id: docTypeId,
                    isActive: true
                },
                attribute: ['exampleDocuments', 'id', 'documentName'],
                include: [{
                    model: DocumentCategories,
                    attribute: ['categoryName', 'description'],
                }]
            });
            return documentTypes;
        } catch (error) {
            console.log('=============Document Types fetch all error ==========', error);
            return [];
        }
    },
    fetchReferencesById: async(docTypeId) => {
        try {
            let documentTypes = await DocumentType.findOne({
                where: {
                    id: docTypeId,
                    isActive: true
                },
                attribute: ['references', 'id', 'documentName'],
                include: [{
                    model: DocumentCategories,
                    attribute: ['categoryName', 'description'],
                    references: {
                        [Sequelize.Op.ne]: null
                    }
                }]
            });
            return documentTypes;
        } catch (error) {
            console.log('=============Document Types fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(docTypeId) => {
        try {
            let documentTypes = await DocumentType.findOne({
                where: {
                    id: docTypeId,
                    isActive: true,
                    documentCategoryId: {
                        [Sequelize.Op.ne]: null,
                    }
                },
                include: [{
                    model: DocumentCategories,
                    attribute: ['categoryName', 'description'],
                }]
            });
            return documentTypes;
        } catch (error) {
            console.log('=============Document Types fetch by id error ==========', error);
        }
    },
    update: async(documentTypesData) => {
        let success = false;
        try {
            let documentTypes = await DocumentType.findOne({
                where: {
                    id: documentTypesData.id,
                    isActive: true,
                    documentCategoryId: {
                        [Sequelize.Op.ne]: null,
                    }
                },
                include: [{
                    model: DocumentCategories,
                    attribute: ['categoryName', 'description'],
                }]
            });
            if (documentTypes) {
                console.log('================= Document Types found for update ============');
                documentTypes.documentCategoryId = documentTypesData.documentCategoryId;
                documentTypes.employerId = documentTypesData.employerId ? documentTypesData.employerId : null;
                documentTypes.documentName = documentTypesData.documentName;
                documentTypes.description = documentTypesData.description;
                documentTypes.requirementLevel = documentTypesData.requirementLevel;
                documentTypes.prefix = documentTypesData.prefix ? documentTypesData.prefix : null;
                documentTypes.exampleDocuments = documentTypesData.exampleDocuments ? documentTypesData.exampleDocuments : null;
                documentTypes.references = documentTypesData.references ? documentTypesData.references : null;
                documentTypes.statusCode = documentTypesData.statusCode ? documentTypesData.statusCode : null;
                documentTypes.updatedBy = documentTypesData.adminId;
                await documentTypes.save();
                success = true;
            }
            return { success, documentTypes };
        } catch (error) {
            console.log('=============Document Types update error ==========', error);
            return { success: false };
        }
    },
    delete: async(docTypeId) => {
        let success = false;
        try {
            let documentTypes = await DocumentType.findOne({
                where: {
                    id: docTypeId,
                    isActive: true,
                    documentCategoryId: {
                        [Sequelize.Op.ne]: null,
                    }
                },
                include: [{
                    model: DocumentCategories,
                    attribute: ['categoryName', 'description'],
                }]
            });
            if (documentTypes) {
                console.log('================= Document Types found for delete ============');
                documentTypes.isActive = false;
                await documentTypes.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Document Types delete error ==========', error);
            return false;
        }
    },
    create: async(documentTypesData) => {
        let success = false;
        try {
            let newDocType = await DocumentType.create({
                id: uuid(),
                documentCategoryId: documentTypesData.docCategoryId,
                employerId: documentTypesData.employerId ? documentTypesData.employerId : null,
                documentName: documentTypesData.documentName,
                description: documentTypesData.description,
                requirementLevel: documentTypesData.requirementLevel,
                prefix: documentTypesData.prefix ? documentTypesData.prefix : null,
                references: documentTypesData.references ? documentTypesData.references : null,
                exampleDocuments: documentTypesData.exampleDocuments ? documentTypesData.exampleDocuments : null,
                statusCode: documentTypesData.statusCode ? documentTypesData.statusCode : null,
                createdBy: documentTypesData.adminId,
                isActive: true
            });
            if (newDocType) {
                console.log('================= Document Types created ============');
                success = true;
            }
            return {
                newDocType,
                success
            };
        } catch (error) {
            console.log('=============Document Types created error ==========', error);
            return { success: false };
        }
    }
};