const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { Employer } = require('./employer');
const { User } = require('./user');
const Employees = sequelize.define('employerEmployees', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    userId: Sequelize.STRING,
    employeeNumber: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    jobTitle: Sequelize.STRING,
    departmentId: Sequelize.STRING,
    locationId: Sequelize.STRING,
    supervisorId: Sequelize.STRING,
    professionId: Sequelize.STRING,
    jobType: Sequelize.STRING,
    agencyId: Sequelize.STRING,
    agencyRecruiterId: Sequelize.STRING,
    shift: Sequelize.STRING,
    jobId: Sequelize.STRING,
    statusCode: Sequelize.INTEGER,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    Employees,
    fetchAll: async() => {
        try {
            let employee = await Employees.findAll({
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
            return employee;
        } catch (error) {
            console.log("===========Employees fetchAll error", error);
            return [];
        }
    },
    fetchAllByEmployerId: async(employerId) => {
        try {
            let employee = await Employees.findAll({
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
            return employee;
        } catch (error) {
            console.log("===========Employees fetchAll error", error);
            return [];
        }
    },
    fetchById: async(employerEmployeeId) => {
        try {
            let employee = await Employees.findOne({
                where: {
                    id: employerEmployeeId,
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
            return employee;
        } catch (error) {
            console.log("==========Employees fetchById error", error);
            return 0;
        }
    },
    fetchByEmployerId: async(employerEmployeeId, employerId) => {
        try {
            let department = await EmployerEmployees.findOne({
                where: {
                    id: employerEmployeeId,
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
            console.log("==========EmployerEmployees fetchById error", error);
            return 0;
        }
    },
    update: async(employerEmployeeData) => {
        let success = false;
        try {
            let employee = await Employees.findOne({
                where: {
                    id: employerEmployeeData.employerEmployeeId,
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
            if (employee) {
                console.log("===========Employees found for update");
                employee.employerId = employerEmployeeData.employerId;
                employee.userId = employerEmployeeData.userId;
                employee.employeeNumber = employerEmployeeData.employeeNumber;
                employee.startDate = employerEmployeeData.startDate;
                employee.endDate = employerEmployeeData.endDate;
                employee.jobTitle = employerEmployeeData.jobTitle;
                employee.departmentId = employerEmployeeData.departmentId;
                employee.locationId = employerEmployeeData.locationId;
                employee.supervisorId = employerEmployeeData.supervisorId;
                employee.professionId = employerEmployeeData.professionId;
                employee.jobType = employerEmployeeData.jobType;
                employee.agencyId = employerEmployeeData.agencyId;
                employee.agencyRecruiterId = employerEmployeeData.agencyRecruiterId;
                employee.shift = employerEmployeeData.shift;
                employee.jobId = employerEmployeeData.jobId;
                employee.statusCode = employerEmployeeData.statusCode;
                employee.updatedBy = employerEmployeeData.adminId;
                await employee.save();
                success = true;
            }
            return { employee, success };
        } catch (error) {
            console.log("===========Employees update error", error);
            return { success: false };
        }
    },
    delete: async(employId) => {
        let success = false;
        try {
            let employee = await Employees.findOne({
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
            if (employee) {
                console.log("===========Employees found for delete=======");
                employee.isActive = false;
                await employee.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log("===========Employees delete Error", error);
            return false;
        }
    },
    create: async(employerEmployeeData) => {
        let success = false;
        try {

            //create user account first;


            //create user profile for "Professional Access";


            let employee = await Employees.create({
                id: uuid(),
                employerId: employerEmployeeData.employerId,
                userId: employerEmployeeData.userId ? employerEmployeeData.userId : null,
                employeeNumber: employerEmployeeData.employeeNumber,
                startDate: employerEmployeeData.startDate,
                endDate: employerEmployeeData.endDate,
                jobTitle: employerEmployeeData.jobTitle ? employerEmployeeData.jobTitle : null,
                departmentId: employerEmployeeData.departmentId,
                locationId: employerEmployeeData.locationId ? employerEmployeeData.locationId : null,
                supervisorId: employerEmployeeData.supervisorId ? employerEmployeeData.supervisorId : null,
                professionId: employerEmployeeData.professionId,
                jobType: employerEmployeeData.jobType,
                agencyId: employerEmployeeData.agencyId ? employerEmployeeData.agencyRecruiterId : null,
                agencyRecruiterId: employerEmployeeData.agencyRecruiterId ? employerEmployeeData.agencyRecruiterId : null,
                shift: employerEmployeeData.shift ? employerEmployeeData.shift : null,
                jobId: employerEmployeeData.jobId ? employerEmployeeData.jobId : null,
                statusCode: employerEmployeeData.statusCode ? employerEmployeeData.statusCode : null,
                createdBy: employerEmployeeData.adminId,
                isActive: true
            });
            if (employee) {
                console.log("===========Employees found for create ============");
                success = true;
            }
            return { employee, success }
        } catch (error) {
            console.log("=========Employees created error ", error);
            return { success: false };
        }
    }

}