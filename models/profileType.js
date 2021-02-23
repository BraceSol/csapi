const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const ProfileType = sequelize.define('profileType', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    profileName: Sequelize.STRING,
    description: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    ProfileType,
    fetchAll: async(filterData) => {
        try {
            let queryObject = {};
            queryObject.where = {};
            queryObject.where.isActive = true;
            if (filterData.profileName) {
                queryObject.where.profileName = filterData.profileName;
            }
            let profileType = await ProfileType.findAll({
                where: queryObject.where
            });
            return profileType;
        } catch (error) {
            console.log('=============profileTypefetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(profileTypeId) => {
        try {
            let profileType = await ProfileType.findOne({
                where: {
                    id: profileTypeId,
                    isActive: true
                }
            });
            return profileType;
        } catch (error) {
            console.log('=============profileType fetch by id error ==========', error);
            return null;
        }
    },
    fetchByName: async(profileName) => {
        try {
            let profileType = await ProfileType.findOne({
                where: {
                    profileName: profileName,
                    isActive: true
                }
            });
            return profileType
        } catch (error) {
            console.log("============ profile fetch by name error ==============", error);
            return null;
        }
    },
    update: async(profileTypeData) => {
        let success = false;
        try {
            let profileType = await ProfileType.findOne({
                where: {
                    id: profileTypeData.profileTypeId,
                    isActive: true
                }
            });
            if (profileType) {
                console.log('================= profileType found for update ============');
                profileType.profileName = profileTypeData.profileName;
                profileType.description = profileTypeData.description;
                profileType.isActive = profileTypeData.isActive;
                await profileType.save();
                success = true;
            }
            return { success, profileType };
        } catch (error) {
            console.log('=============profileType update error ==========', error);
            return { success: false };
        }
    },
    delete: async(profileTypeId) => {
        let success = false;
        try {
            let profileType = await ProfileType.findOne({
                where: {
                    id: profileTypeId,
                    isActive: true
                }
            });
            if (profileType) {
                console.log('================= profileType found for delete ============');
                profileType.isActive = false;
                await profileType.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============profileType delete error ==========', error);
            return false;
        }
    },
    create: async(profileTypeData) => {
        let success = false;
        try {
            let profileType = await ProfileType.create({
                id: uuid(),
                profileName: profileTypeData.profileName,
                description: profileTypeData.description,
                isActive: true
            });
            if (profileType) {
                console.log('================= profileType created ============');
                success = true;
            }
            return {
                profileType,
                success
            };
        } catch (error) {
            console.log('=============profileType created error ==========', error);
            return { success: false };
        }
    }
};