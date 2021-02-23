const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const UserProfile = sequelize.define('userProfile', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    UserProfile,
    fetchAll: async() => {
        try {
            let userProfile = await UserProfile.findAll({
                where: {
                    isActive: true
                }
            });
            return userProfile;
        } catch (error) {
            console.log('=============User Profile fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(userProfileId) => {
        try {
            let userProfile = await UserProfile.findOne({
                where: {
                    id: userProfileId,
                    isActive: true
                }
            });
            return userProfile;
        } catch (error) {
            console.log('=============user Profile fetch by id error ==========', error);
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let userProfiles = await UserProfile.findAll({
                where: {
                    userId: userId,
                    profileTypeId: {
                        [Sequelize.Op.ne]: null
                    },
                    isActive: true
                }
            });
            return userProfiles;
        } catch (error) {
            console.log("============== user profiles by user id error =============", error);
            return null;
        }
    },
    fetchByUserId: async(userId) => {
        try {
            let userProfiles = await UserProfile.findOne({
                where: {
                    userId: userId,
                    profileTypeId: {
                        [Sequelize.Op.ne]: null
                    },
                    isActive: true
                }
            });
            return userProfiles;
        } catch (error) {
            console.log("============== user profiles by user id error =============", error);
            return null;
        }
    },
    update: async(userProfileData) => {
        let success = false;
        try {
            let userProfile = await UserProfile.findOne({
                where: {
                    profileTypeId: userProfileData.profileTypeId,
                    isActive: true
                }
            });
            if (userProfile) {
                console.log('================= User Profile found for update ============');
                userProfile.profileTypeId = userProfileData.profileTypeId;
                userProfile.userId = userProfileData.userId;
                userProfile.isActive = userProfileData.isActive;
                await userProfile.save();
                success = true;
            }
            return { success, userProfile };
        } catch (error) {
            console.log('=============userProfile update error ==========', error);
            return { success: false };
        }
    },
    delete: async(userProfileId) => {
        let success = false;
        try {
            let userProfile = await UserProfile.findOne({
                where: {
                    id: userProfileId,
                    isActive: true
                }
            });
            if (userProfile) {
                console.log('================= userProfile found for delete ============');
                userProfile.isActive = false;
                await userProfile.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============userProfile delete error ==========', error);
            return false;
        }
    },
    create: async(userProfileData) => {
        let success = false;
        try {
            let userProfile = await UserProfile.create({
                id: uuid(),
                profileTypeId: userProfileData.profileTypeId,
                userId: userProfileData.userId,
                isActive: true
            });
            if (userProfile) {
                console.log('================= userProfile created ============');
                success = true;
            }
            return {
                userProfile,
                success
            };
        } catch (error) {
            console.log('=============userProfile created error ==========', error);
            return { success: false };
        }
    }
};