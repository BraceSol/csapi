const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { Employer } = require('./employer');
const EmployerDepartments = sequelize.define('employerDepartment', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    departmentName: Sequelize.STRING,
    costCenterCode: Sequelize.STRING,
    description: Sequelize.STRING,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    EmployerDepartments,
    fetchAll: async() => {
        try {
            let department = await EmployerDepartments.findAll({
                where: {
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
            return department;
        } catch (error) {
            console.log("===========EmployerDepartments fetchAll error", error);
            return [];
        }
    },
    fetchAllByEmployerId: async(employerId) => {
        try {
            let department = await EmployerDepartments.findAll({
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
                }]
            });
            return department;
        } catch (error) {
            console.log("===========EmployerDepartments fetchAll error", error);
            return [];
        }
    },
    fetchById: async(employerDepartmentId) => {
        try {
            let department = await EmployerDepartments.findOne({
                where: {
                    id: employerDepartmentId,
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
            return department;
        } catch (error) {
            console.log("==========EmployerDepartments fetchById error", error);
            return 0;
        }
    },
    fetchByEmployerId: async(employerDepartmentId, employerId) => {
        try {
            let department = await EmployerDepartments.findOne({
                where: {
                    id: employerDepartmentId,
                    employerId: employerId,
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
            return department;
        } catch (error) {
            console.log("==========EmployerDepartments fetchById error", error);
            return 0;
        }
    },
    update: async(employerDepartmentData) => {
        let success = false;
        try {
            let department = await EmployerDepartments.findOne({
                where: {
                    id: employerDepartmentData.employerDepartmentId,
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
            if (department) {
                console.log("===========EmployerDepartments found for update");
                department.employerId = employerDepartmentData.employerId;
                department.departmentName = employerDepartmentData.departmentName;
                department.costCenterCode = employerDepartmentData.costCenterCode;
                department.description = employerDepartmentData.description;
                department.updatedBy = employerDepartmentData.adminId;
                await department.save();
                success = true;
            }
            return { department, success };
        } catch (error) {
            console.log("===========EmployerDepartments update error", error);
            return { success: false };
        }
    },
    delete: async(employId) => {
        let success = false;
        try {
            let department = await EmployerDepartments.findOne({
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
            if (department) {
                console.log("===========EmployerDepartments found for delete=======");
                department.isActive = false;
                await department.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log("===========EmployerDepartments delete Error", error);
            return false;
        }
    },
    create: async(employerDepartmentData) => {
        let success = false;
        try {
            let department = await EmployerDepartments.create({
                id: uuid(),
                employerId: employerDepartmentData.employerId,
                departmentName: employerDepartmentData.departmentName,
                costCenterCode: employerDepartmentData.costCenterCode,
                description: employerDepartmentData.descripition,
                createdBy: employerDepartmentData.adminId,
                updatedBy: employerDepartmentData.adminId,
                isActive: true
            });
            if (department) {
                console.log("===========EmployerDepartments found for create ============");
                success = true;
            }
            return { department, success }
        } catch (error) {
            console.log("=========EmployerDepartments created error ", error);
            return { success: false };
        }
    }

}