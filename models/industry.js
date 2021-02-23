const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const Industry = sequelize.define('industry', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    industryName: Sequelize.STRING,
    description: Sequelize.STRING,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    Industry,
    fetchAll: async() => {
        try {
            let industry = await Industry.findAll({
                where: {
                    isActive: true
                }
            });
            return industry;
        } catch (error) {
            console.log('=============Industry fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(industryId) => {
        try {
            let industry = await Industry.findOne({
                where: {
                    id: industryId,
                    isActive: true
                }
            });
            return industry;
        } catch (error) {
            console.log('=============Industry fetch by id error ==========', error);
        }
    },
    update: async(industryData) => {
        let success = false;
        try {
            let industry = await Industry.findOne({
                where: {
                    id: industryData.industryId,
                    isActive: true
                }
            });
            if (industry) {
                console.log('================= Industry found for update ============');
                industry.industryName = industryData.industryName;
                industry.description = industryData.description;
                industry.updatedBy = industryData.adminId;
                await industry.save();
                success = true;
            }
            return { success, industry };
        } catch (error) {
            console.log('=============Industry update error ==========', error);
            return { success: false };
        }
    },
    delete: async(industryId) => {
        let success = false;
        try {
            let industry = await Industry.findOne({
                where: {
                    id: industryId,
                    isActive: true
                }
            });
            if (industry) {
                console.log('================= Industry found for delete ============');
                industry.isActive = false;
                await industry.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Industry delete error ==========', error);
            return false;
        }
    },
    create: async(industryData) => {
        let success = false;
        try {
            let industry = await Industry.create({
                id: uuid(),
                industryName: industryData.industryName,
                description: industryData.description,
                createdBy: industryData.adminId,
                isActive: true
            });
            if (industry) {
                console.log('================= Industry created ============');
                success = true;
            }
            return {
                industry,
                success
            };
        } catch (error) {
            console.log('=============Industry created error ==========', error);
            return { success: false };
        }
    }
};