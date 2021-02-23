const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { EmployerDocTypes } = require('./employerDocTypes');
const { Employer } = require("./employer");
const { DocumentType } = require('./documentTypes');
const { DocumentCategories } = require('./documentCategories');
const EmployerDocTypeRules = sequelize.define('employerDocTypeRules', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    professionId: Sequelize.STRING,
    specialtyId: Sequelize.STRING,
    departmentId: Sequelize.STRING,
    locationId: Sequelize.STRING,
    title: Sequelize.STRING,
    decription: Sequelize.STRING,
    ruleQuery: Sequelize.STRING,
    ruleConfig: Sequelize.JSON,
    isSystem: Sequelize.BOOLEAN,
    statusCode: Sequelize.INTEGER,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    EmployerDocTypeRules,
    fetchAll: async() => {
        try {
            let doctypeRules = await EmployerDocTypeRules.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: EmployerDocTypes,
                    attributes: ['documentName'],
                    where: {
                        isActive: true
                    },
                    include: [{
                        model: Employer,
                        attributes: ["employerName"],
                        where: {
                            isActive: true
                        }
                    }]
                }]
            });
            return doctypeRules;
        } catch (error) {
            console.log("===========EmployerDocTypesRule fetchAll error", error);
            return [];
        }
    },
    fetchAllByEmployerIdAndDocumentTypeId: async(employerId, employerDocTypeId) => {
        try {
            let doctypeRules = await EmployerDocTypeRules.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: EmployerDocTypes,
                    attributes: ['documentName'],
                    where: {
                        id: employerDocTypeId,
                        isActive: true
                    },
                    include: [{
                        model: Employer,
                        attributes: ["employerName"],
                        where: {
                            id: employerId,
                            isActive: true
                        }
                    }]
                }]
            });
            return doctypeRules;
        } catch (error) {
            console.log("===========EmployerDocTypesRule fetchAll error", error);
            return [];
        }
    },
    fetchById: async(employerDocTypeId, employerDocTypeRuleId) => {
        try {
            let doctypeRule = await EmployerDocTypeRules.findOne({
                where: {
                    id: employerDocTypeRuleId,
                    isActive: true
                },
                include: [{
                    model: EmployerDocTypes,
                    attributes: ['documentName'],
                    where: {
                        id: employerDocTypeId,
                        isActive: true
                    },
                    include: [{
                        model: Employer,
                        attributes: ["employerName"],
                        where: {
                            isActive: true
                        }
                    }]
                }]
            });
            return doctypeRule;
        } catch (error) {
            console.log("==========EmployerDocTypesRule fetchById error", error);
            return 0;
        }
    },
    update: async(employerDocTypeRuleData) => {
        let success = false;
        try {
            let doctypeRule = await EmployerDocTypeRules.findOne({
                where: {
                    id: employerDocTypeRuleData.employerDocTypeRuleId,
                    isActive: true
                },
                include: [{
                    model: EmployerDocTypes,
                    attributes: ['documentName'],
                    where: {
                        id: employerDocTypeId,
                        isActive: true
                    },
                    include: [{
                        model: Employer,
                        attributes: ["employerName"],
                        where: {
                            isActive: true
                        }
                    }]
                }]
            });
            if (doctypeRule) {
                console.log("===========EmployerDocTypes rule found for update");
                doctypeRule.employerDocTypeId = employerDocTypeRuleData.employerDocTypeId;
                doctypeRule.professionId = employerDocTypeRuleData.professionId ? employerDocTypeRuleData.professionId : null;
                doctypeRule.specialtyId = employerDocTypeRuleData.specialtyId ? employerDocTypeRuleData.specialtyId : null;
                doctypeRule.departmentId = employerDocTypeRuleData.departmentId ? employerDocTypeRuleData.departmentId : null;
                doctypeRule.locationId = employerDocTypeRuleData.locationId ? employerDocTypeRuleData.locationId : null;
                doctypeRule.title = employerDocTypeRuleData.title;
                doctypeRule.description = employerDocTypeRuleData.descripition;
                doctypeRule.ruleQuery = employerDocTypeRuleData.ruleQuery;
                doctypeRule.ruleConfig = employerDocTypeRuleData.ruleConfig;
                doctypeRule.isSystem = employerDocTypeRuleData.isSystem;
                doctypeRule.statusCode = employerDocTypeRuleData.statusCode;
                doctypeRule.updatedBy = employerDocTypeRuleData.adminId;
                await doctypeRule.save();
                success = true;
            }
            return { doctypeRule, success };
        } catch (error) {
            console.log("===========EmployerDocTypes rule update error", error);
            return { success: false };
        }
    },
    delete: async(employerDocTypeRuleId, employerDocTypeId) => {
        let success = false;
        try {
            let doctypeRule = await EmployerDocTypeRules.findOne({
                where: {
                    id: employerDocTypeRuleId,
                    isActive: true
                },
                include: [{
                    model: EmployerDocTypes,
                    attributes: ['documentName'],
                    where: {
                        id: employerDocTypeId,
                        isActive: true
                    },
                    include: [{
                        model: Employer,
                        attributes: ["employerName"],
                        where: {
                            isActive: true
                        }
                    }]
                }]
            });
            if (doctypeRule) {
                console.log("===========EmployerDocTypes rule found for delete=======");
                doctypeRule.isActive = false;
                await doctypeRule.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log("===========EmployerDocTypes rule delete Error", error);
            return false;
        }
    },
    create: async(employerDocTypeRuleData) => {
        let success = false;
        try {
            let doctypeRule = await EmployerDocTypeRules.create({
                id: uuid(),
                employerDocTypeId: employerDocTypeRuleData.employerDocTypeId,
                professionId: employerDocTypeRuleData.professionId ? employerDocTypeRuleData.professionId : null,
                specialtyId: employerDocTypeRuleData.specialtyId ? employerDocTypeRuleData.specialtyId : null,
                departmentId: employerDocTypeRuleData.departmentId ? employerDocTypeRuleData.departmentId : null,
                locationId: employerDocTypeRuleData.locationId ? employerDocTypeRuleData.locationId : null,
                title: employerDocTypeRuleData.title,
                description: employerDocTypeRuleData.descripition,
                ruleQuery: employerDocTypeRuleData.ruleQuery,
                ruleConfig: employerDocTypeRuleData.ruleConfig,
                isSystem: employerDocTypeRuleData.isSystem,
                statusCode: employerDocTypeRuleData.statusCode,
                createdBy: employerDocTypeRuleData.adminId,
                isActive: true
            });
            if (doctypeRule) {
                console.log("===========EmployerDocTypes Rule found for create ============");
                success = true;
            }
            return { doctypeRule, success }
        } catch (error) {
            console.log("=========EmployerDocTypes Rule created error ", error);
            return { success: false };
        }
    }

}