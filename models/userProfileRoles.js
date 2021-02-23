const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const { Role } = require('./role');
const UserProfile = require('./userProfile');
const sequelize = require('../utils/database');

const UserProfileRoles = sequelize.define('userProfileRoles', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    UserProfileRoles,
    fetchAll: async() => {
        try {
            let userProfileRoles = await UserProfileRoles.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: Role,
                    attributes: ['roleName']
                }]
            });
            return userProfileRoles;
        } catch (error) {
            console.log('=============userProfileRoles fetch all error ==========', error);
            return [];
        }
    },
    fetchAllByUserProfileId: async(userProfileId) => {
        try {
            let userProfileRoles = await UserProfileRoles.findAll({
                userProfileId: userProfileId,
                isActive: true
            });
            return userProfileRoles;
        } catch (error) {
            console.log('=============userProfileRoles fetch by id error ==========', error);
            return 0;
        }
    },
    fetchById: async(userProfileRoleId) => {
        try {
            let userProfileRoles = await UserProfileRoles.findOne({
                where: {
                    id: userProfileRoleId,
                    isActive: true
                },
                include: [{
                    model: Role,
                    attributes: ['roleName']
                }]
            });
            return userProfileRoles;
        } catch (error) {
            console.log('=============userProfileRoles fetch by id error ==========', error);
            return 0;
        }
    },
    update: async(userProfileRoleData) => {
        let success = false;
        try {
            let userProfileRole = await UserProfileRoles.findOne({
                where: {
                    id: userProfileRoleData.userProfileRoleId,
                    isActive: true
                },
                include: [{
                    model: Role,
                    attributes: ['roleName']
                }]
            });
            if (userProfileRole) {
                console.log('================= userProfileRole found for update ============');
                userProfileRole.userProfileId = userProfileRoleData.userProfileId;
                userProfileRole.roleId = userProfileRoleData.roleId;
                userProfileRole.isActive = userProfileRoleData.isActive;
                await userProfileRole.save();
                success = true;
            }
            return { success, userProfileRole };
        } catch (error) {
            console.log('=============userProfileRole update error ==========', error);
            return { success: false };
        }
    },
    delete: async(userProfileRoleId) => {
        let success = false;
        try {
            let userProfileRole = await UserProfileRoles.findOne({
                where: {
                    id: userProfileRoleId,
                    isActive: true
                },
                include: [{
                    model: Role,
                    attributes: ['roleName']
                }]
            });
            if (userProfileRole) {
                console.log('================= user Profile Role found for delete ============');
                userProfileRole.isActive = false;
                await userProfileRole.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============userProfile Role delete error ==========', error);
            return false;
        }
    },
    create: async(userProfileRoleData) => {
        let success = false;
        try {
            let userProfileRole = await UserProfileRoles.create({
                id: uuid(),
                userProfileId: userProfileRoleData.userProfileId,
                roleId: userProfileRoleData.roleId,
                isActive: true
            });
            if (userProfileRole) {
                console.log('================= userProfile Role created ============');
                success = true;
            }
            return {
                userProfileRole,
                success
            };
        } catch (error) {
            console.log('=============userProfile Role created error ==========', error);
            return { success: false };
        }
    }
};