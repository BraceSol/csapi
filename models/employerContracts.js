const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../utils/database');
const { Employer } = require('./employer');
const EmployerContracts = sequelize.define("employerContracts", {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    agencyId: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    professionIds: Sequelize.JSON,
    employerContact: Sequelize.STRING,
    agencyContact: Sequelize.STRING,
    createBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    EmployerContracts,
    fetchAll: async() => {
        try {
            let contract = await EmployerContracts.findAll({
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
            return contract
        } catch (error) {
            console.log("===========EmployerContracts fetchAll error=============", error);
            return [];
        }
    },
    fetchAllByEmployerId: async(employerId) => {
        try {
            let contract = await EmployerContracts.findAll({
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
            return contract
        } catch (error) {
            console.log("===========EmployerContracts fetchAll error=============", error);
            return [];
        }
    },
    fetchById: async(contractId, employerId) => {
        try {
            let contract = await EmployerContracts.findOne({
                where: {
                    id: contractId,
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
            return contract;
        } catch (error) {
            console.log("==============EmployerContracts fetchById error=========", error);
            return 0;
        }
    },
    update: async(contractData) => {
        let success = false;
        try {
            let contract = await EmployerContracts.findOne({
                where: {
                    id: contractData.contractId,
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
            if (contract) {
                console.log("========EmployerContracts found for update========");
                contract.employerId = contractData.employerId;
                contract.agencyId = contractData.agencyId ? contractData.agencyId : null;
                contract.startDate = contractData.startDate;
                contract.endDate = contractData.endDate;
                contract.professionIds = contract.professionIds;
                contract.employerContact = contractData.employerContact;
                contract.agencyContact = contractData.agencyContact ? contractData.agencyContact : null;
                contract.updatedBy = contractData.updatsedBy;
                await contract.save();
                success = true;
            }
            return { contract, success };
        } catch (error) {
            console.log("=========EmployerContracts update error==========", error);
            return { success: false };
        }
    },
    delete: async(contractId) => {
        let success = false;
        try {
            let contract = await EmployerContracts.findOne({
                where: {
                    id: contractId,
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
            if (contract) {
                console.log("==========EmployerContracts found for delete======");
                contract.isActive = false;
                await contract.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log("=========Employer Contracts delete error======", error);
            return false;
        }
    },
    create: async(contractData) => {
        let success = false;
        try {
            let contract = await EmployerContracts.create({
                id: uuid(),
                employerId: contractData.employerId,
                agencyId: contractData.agencyId ? contractData.agencyId : null,
                startDate: contractData.startDate,
                endDate: contractData.endDate,
                professionIds: contractData.professionIds,
                employerContact: contractData.employerContact,
                agencyContact: contractData.agencyContact ? contractData.agencyContact : null,
                createdBy: contractData.adminId,
                isActive: true
            });
            if (contract) {
                console.log("========EmployerContracts found for create=====");
                success = true;
            }
            return { contract, success };
        } catch (error) {
            console.log("=========EmployerContracts created error", error);
            return { success: false };
        }
    }

}