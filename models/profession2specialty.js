const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { Specialty } = require('./specialty');
const { Profession } = require("./profession");
const Profession2specialty = sequelize.define('profession2specialty', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    Profession2specialty,
    fetchAll: async() => {
        try {
            let profession2specialty = await Profession2specialty.findAll({
                where: {
                    isActive: true
                }
            });
            return profession2specialty;
        } catch (error) {
            console.log('=============Profession2specialty fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(profession2specialtyId) => {
        try {
            let profession2specialty = await Profession2specialty.findOne({
                where: {
                    id: profession2specialtyId,
                    isActive: true
                }
            });
            return profession2specialty;
        } catch (error) {
            console.log('=============Profession2specialty fetch by id error ==========', error);
        }
    },
    fetchByProfessionId: async(professionId) => {
        try {
            let specialty = await Profession2specialty.findOne({
                where: {
                    professionId: professionId,
                    isActive: true
                }
            });
            return specialty;
        } catch (error) {
            console.log('=================== Specialty fetch by profession id error ========================', error);
            return null;
        }
    },
    fetchAllByProfessionId: async(professionId) => {
        try {
            let specialty = await Profession2specialty.findAll({
                where: {
                    professionId: professionId,
                    isActive: true
                }
            });
            return specialty;
        } catch (error) {
            console.log('=================== Specialty fetch by profession id error ========================', error);
            return null;
        }
    },
    fetchAllBySpecialtyId: async(specialtyId) => {
        try {
            let specialty = await Profession2specialty.findAll({
                where: {
                    specialtyId: specialtyId,
                    isActive: true
                }
            });
            return specialty;
        } catch (error) {
            console.log('=================== Specialty fetch by profession id error ========================', error);
            return null;
        }
    },

    update: async(profession2specialtyData) => {
        let success = false;
        try {
            let profession2specialty = await Profession2specialty.findOne({
                where: {
                    id: profession2specialtyData.profession2specialtyId,
                    isActive: true
                }
            });
            if (profession2specialty) {
                console.log('================= Profession2specialty found for update ============');
                profession2specialty.professionId = profession2specialtyId.professionId;
                profession2specialty.specialtyId = profession2specialtyId.specialtyId;
                await profession2specialty.save();
                success = true;
            }
            return { success, profession2specialty };
        } catch (error) {
            console.log('=============Profession2specialty update error ==========', error);
            return { success: false };
        }
    },
    delete: async(profession2specialtyId) => {
        let success = false;
        try {
            let profession2specialty = await Profession2specialty.findOne({
                where: {
                    id: profession2specialtyId,
                    isActive: true
                }
            });
            if (profession2specialty) {
                console.log('================= Profession2specialty found for delete ============');
                profession2specialty.isActive = false;
                await profession2specialty.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Profession2specialty delete error ==========', error);
            return false;
        }
    },
    create: async(profession2specialtyIdData) => {
        let success = false;
        try {
            let profession2specialty = await Profession2specialty.create({
                id: uuid(),
                professionId: profession2specialtyIdData.professionId,
                specialtyId: profession2specialtyIdData.specialtyId,
                isActive: true
            });
            if (profession2specialty) {
                console.log('================= Profession2specialty created ============');
                success = true;
            }
            return {
                profession2specialty,
                success
            };
        } catch (error) {
            console.log('=============Profession2specialty created error ==========', error);
            return { success: false };
        }
    }
};