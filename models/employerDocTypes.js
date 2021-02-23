const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { Employer } = require('./employer');
const { DocumentType } = require('./documentTypes');
const { DocumentCategories } = require('./documentCategories');
const EmployerDocTypes = sequelize.define('employerDocType', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    documentName: Sequelize.STRING,
    description: Sequelize.STRING,
    exampleDocuments: Sequelize.JSON,
    requirementLevel: Sequelize.INTEGER,
    references: Sequelize.JSON,
    statusCode: Sequelize.INTEGER,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    EmployerDocTypes,
    fetchAll: async() => {
        try {
            let doctype = await EmployerDocTypes.findAll({
                where: {
                    isActive: true
                },
                include: [{
                        model: Employer,
                        attributes: ['employerName'],
                        where: {
                            isActive: true
                        }
                    },
                    {
                        model: DocumentType,
                        attributes: ['documentName'],
                        where: {
                            isActive: true
                        },
                        include: [{
                            model: DocumentCategories,
                            attributes: ['categoryName'],
                            where: {
                                isActive: true
                            }
                        }]
                    }
                ]
            });
            return doctype;
        } catch (error) {
            console.log("===========EmployerDocTypes fetchAll error", error);
            return [];
        }
    },
    fetchAllByEmployerId: async(employerId) => {
        try {
            let doctype = await EmployerDocTypes.findAll({
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
                    },
                    {
                        model: DocumentType,
                        attributes: ['documentName', 'description', 'prefix', 'requirementLevel'],
                        where: {
                            isActive: true
                        },
                        include: [{
                            model: DocumentCategories,
                            attributes: ['categoryName', 'id'],
                            where: {
                                isActive: true
                            }
                        }]
                    }
                ]
            });
            return doctype;
        } catch (error) {
            console.log("===========EmployerDocTypes fetchAll error", error);
            return [];
        }
    },
    fetchById: async(employerDocTypeId) => {
        try {
            let doctype = await EmployerDocTypes.findOne({
                where: {
                    id: employerDocTypeId,
                    isActive: true
                },
                include: [{
                        model: Employer,
                        attributes: ['employerName'],
                        where: {
                            isActive: true
                        }
                    },
                    {
                        model: DocumentType,
                        attributes: ['documentName'],
                        where: {
                            isActive: true
                        },
                        include: [{
                            model: DocumentCategories,
                            attributes: ['categoryName'],
                            where: {
                                isActive: true
                            }
                        }]
                    }
                ]
            });
            return doctype;
        } catch (error) {
            console.log("==========EmployerDocTypes fetchById error", error);
            return 0;
        }
    },
    fetchByEmployerId: async(employerDocTypeId, employerId) => {
        try {
            let doctype = await EmployerDocTypes.findOne({
                where: {
                    id: employerDocTypeId,
                    employerId: employerId,
                    isActive: true
                },
                include: [{
                        model: Employer,
                        attributes: ['employerName'],
                        where: {
                            isActive: true
                        }
                    },
                    {
                        model: DocumentType,
                        attributes: ['documentName'],
                        where: {
                            isActive: true
                        },
                        include: [{
                            model: DocumentCategories,
                            attributes: ['categoryName'],
                            where: {
                                isActive: true
                            }
                        }]
                    }
                ]
            });
            return doctype;
        } catch (error) {
            console.log("==========EmployerDocTypes fetchById error", error);
            return 0;
        }
    },
    update: async(employerDocTypeData) => {
        let success = false;
        try {
            let doctype = await EmployerDocTypes.findOne({
                where: {
                    id: employerDocTypeData.employerDocTypeId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true,
                        id: employerDocTypeData.employerId
                    }
                }]
            });
            if (doctype) {
                console.log("===========EmployerDocTypes found for update");
                doctype.employerId = employerDocTypeData.employerId;
                doctype.documentTypeId = employerDocTypeData.documentTypeId;
                doctype.documentName = employerDocTypeData.documentName;
                doctype.description = employerDocTypeData.descripition;
                doctype.exampleDocuments = employerDocTypeData.exampleDocuments ? employerDocTypeData.exampleDocuments : null;
                doctype.requirementLevel = employerDocTypeData.requirementLevel ? employerDocTypeData.requirementLevel : null;
                doctype.references = employerDocTypeData.references ? employerDocTypeData.references : null;
                doctype.statusCode = employerDocTypeData.statusCode;
                doctype.updatedBy = employerDocTypeData.adminId;
                await doctype.save();
                success = true;
            }
            return { doctype, success };
        } catch (error) {
            console.log("===========EmployerDocTypes update error", error);
            return { success: false };
        }
    },
    delete: async(employId) => {
        let success = false;
        try {
            let doctype = await EmployerDocTypes.findOne({
                where: {
                    id: employId,
                    isActive: true
                },
                include: [{
                    model: Employer,
                    attributes: ['employerName'],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (doctype) {
                console.log("===========EmployerDocTypes found for delete=======");
                doctype.isActive = false;
                await doctype.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log("===========EmployerDocTypes delete Error", error);
            return false;
        }
    },
    create: async(employerDocTypeData) => {
        let success = false;
        try {
            let doctype = await EmployerDocTypes.create({
                id: uuid(),
                employerId: employerDocTypeData.employerId,
                documentTypeId: employerDocTypeData.documentTypeId,
                documentName: employerDocTypeData.documentName,
                description: employerDocTypeData.descripition,
                exampleDocuments: employerDocTypeData.exampleDocuments ? employerDocTypeData.exampleDocuments : null,
                requirementLevel: employerDocTypeData.requirementLevel ? employerDocTypeData.requirementLevel : null,
                references: employerDocTypeData.references ? employerDocTypeData.references : null,
                statusCode: employerDocTypeData.statusCode,
                createdBy: employerDocTypeData.adminId,
                isActive: true
            });
            if (doctype) {
                console.log("===========EmployerDocTypes found for create ============");
                success = true;
            }
            return { doctype, success }
        } catch (error) {
            console.log("=========EmployerDocTypes created error ", error);
            return { success: false };
        }
    }

}