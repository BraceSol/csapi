const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { sperateName } = require('../_helpers/helper');

const Specialty = sequelize.define('specialty', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    specialtyName: Sequelize.STRING,
    description: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    Specialty,
    fetchAll: async() => {
        try {
            let specialty = await Specialty.findAll({
                where: {
                    isActive: true
                }
            });
            return specialty;
        } catch (error) {
            console.log('=============Specialty fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(specialtyId) => {
        try {
            let specialty = await Specialty.findOne({
                where: {
                    id: specialtyId,
                    isActive: true
                }
            });
            return specialty;
        } catch (error) {
            console.log('=============Specialty fetch by id error ==========', error);
            return null;
        }
    },
    fetchByName: async(specialtyName) => {
        try {
            let specialty = await Specialty.findOne({
                where: {
                    specialtyName: specialtyName,
                    isActive: true
                }
            });
            return specialty;
        } catch (error) {
            console.log('=============Specialty fetch by name error ==========', error);
            return null;
        }
    },
    fetchByIndustry: async(industryId) => {
        try {
            let specialties = await Specialty.findAll({
                where: {
                    industryId: industryId,
                    isActive: true
                }
            })
            return specialties;
        } catch (error) {
            console.log("=============== specialty fetch by industry error ====================", error);
            return null;
        }
    },
    update: async(specialtyData) => {
        let success = false;
        try {
            let specialty = await Specialty.findOne({
                where: {
                    id: specialtyData.specialtyId,
                    isActive: true
                }
            });
            if (specialty) {
                console.log('================= Specialty found for update ============');
                specialty.industryId = specialtyData.industryId;
                specialty.specialtyName = specialtyData.specialtyName;
                specialty.description = specialtyData.description;
                specialty.isActive = specialtyData.isActive;
                await specialty.save();
                success = true;
            }
            return { success, specialty };
        } catch (error) {
            console.log('=============Specialty update error ==========', error);
            return { success: false };
        }
    },
    delete: async(specialtyId) => {
        let success = false;
        try {
            let specialty = await Specialty.findOne({
                where: {
                    id: specialtyId,
                    isActive: true
                }
            });
            if (specialty) {
                console.log('================= Specialty found for delete ============');
                specialty.isActive = false;
                await specialty.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Specialty delete error ==========', error);
            return false;
        }
    },
    create: async(specialtyData) => {
        let success = false;
        try {
            let specialty = await Specialty.create({
                id: uuid(),
                industryId: specialtyData.industryId,
                specialtyName: specialtyData.specialtyName,
                description: specialtyData.description,
                isActive: true
            });
            if (specialty) {
                console.log('================= Specialty created ============');
                success = true;
            }
            return {
                specialty,
                success
            };
        } catch (error) {
            console.log('=============Specialty created error ==========', error);
            return { success: false };
        }
    }
};