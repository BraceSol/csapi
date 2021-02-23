const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const Profession = sequelize.define('profession', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    professionName: Sequelize.STRING,
    description: Sequelize.STRING,
    sortOrder: Sequelize.INTEGER,
    isDefault: Sequelize.BOOLEAN,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    Profession,
    fetchAll: async() => {
        try {
            let profession = await Profession.findAll({
                where: {
                    isActive: true
                }
            });
            return profession;
        } catch (error) {
            console.log('=============Profession fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(professionId) => {
        try {
            let profession = await Profession.findOne({
                where: {
                    id: professionId,
                    isActive: true
                }
            });
            return profession;
        } catch (error) {
            console.log('=============Profession fetch by id error ==========', error);
            return null;
        }
    },
    fetchByIndustry: async(industryId) => {
        try {
            let professions = await Profession.findAll({
                where: {
                    industryId: industryId,
                    isActive: true
                }
            })
            return professions;
        } catch (error) {
            console.log("=============== profession fetch by industry error ====================", error);
            return null;
        }
    },
    fetchByName: async(professionName) => {
        try {
            let profession = await Profession.findOne({
                where: {
                    professionName: professionName,
                    isActive: true
                }
            });
            return profession;
        } catch (error) {
            console.log('================= Profession fetch by name error ================', error);
            return null;
        }
    },
    update: async(professionData) => {
        let success = false;
        try {
            let profession = await Profession.findOne({
                where: {
                    id: professionData.professionId,
                    isActive: true
                }
            });
            if (profession) {
                console.log('================= Profession found for update ============');
                profession.industryId = professionData.industryId;
                profession.professionName = professionData.professionName;
                profession.description = professionData.description;
                profession.isDefault = professionData.isDefault;
                profession.sortOrder = professionData.sortOrder ? professionData.sortOrder : null;
                await profession.save();
                success = true;
            }
            return { success, profession };
        } catch (error) {
            console.log('=============Profession update error ==========', error);
            return { success: false };
        }
    },
    delete: async(professionId) => {
        let success = false;
        try {
            let profession = await Profession.findOne({
                where: {
                    id: professionId,
                    isActive: true
                }
            });
            if (profession) {
                console.log('================= Profession found for delete ============');
                profession.isActive = false;
                await profession.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Profession delete error ==========', error);
            return false;
        }
    },
    create: async(professionData) => {
        let success = false;
        try {
            let profession = await Profession.create({
                id: uuid(),
                industryId: professionData.industryId,
                professionName: professionData.professionName,
                description: professionData.description,
                isDefault: professionData.isDefault,
                sortOrder: professionData.sortOrder ? professionData.sortOrder : null,
                isActive: true
            });
            if (profession) {
                console.log('================= Profession created ============');
                success = true;
            }
            return {
                profession,
                success
            };
        } catch (error) {
            console.log('=============Profession created error ==========', error);
            return { success: false };
        }
    }
};