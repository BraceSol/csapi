const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const { ProfileType } = require('./profileType');
const sequelize = require('../utils/database');

const Role = sequelize.define('role', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    roleName: Sequelize.STRING,
    description: Sequelize.STRING,
    isEnabled: Sequelize.BOOLEAN,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    Role,
    fetchAll: async() => {
        try {
            let role = await Role.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: ProfileType,
                    attributes: ['profileName']
                }]
            });
            return role;
        } catch (error) {
            console.log('=============Role fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(roleId) => {
        try {
            let role = await Role.findOne({
                where: {
                    id: roleId,
                    isActive: true
                },
                include: [{
                    model: ProfileType,
                    attributes: ['profileName']
                }]
            });
            return role;
        } catch (error) {
            console.log('=============Role fetch by id error ==========', error);
        }
    },
    update: async(roleData) => {
        let success = false;
        try {
            let role = await Role.findOne({
                where: {
                    id: roleData.id,
                    isActive: true
                },
                include: [{
                    model: ProfileType,
                    attributes: ['profileName'],
                    where: {
                        id: roleData.profileTypeId
                    }
                }]
            });
            if (role) {
                console.log('================= Role found for update ============');
                role.roleName = roleData.roleName;
                role.description = roleData.description;
                role.profileTypeId = roleData.profileTypeId;
                role.isEnabled = roleData.isEnabled;
                role.isActive = roleData.isActive;
                await role.save();
                success = true;
            }
            return { success, role };
        } catch (error) {
            console.log('=============role update error ==========', error);
            return { success: false };
        }
    },
    delete: async(roleId) => {
        let success = false;
        try {
            let role = await Role.findOne({
                where: {
                    id: roleId,
                    isActive: true
                },
                include: [{
                    model: ProfileType,
                    attributes: ['profileName']
                }]
            });
            if (role) {
                console.log('================= role found for delete ============');
                role.isActive = false;
                await role.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============role delete error ==========', error);
            return false;
        }
    },
    create: async(roleData) => {
        let success = false;
        try {
            let role = await Role.create({
                id: uuid(),
                roleName: roleData.roleName,
                description: roleData.description,
                profileTypeId: roleData.profileTypeId,
                isEnabled: roleData.isEnabled,
                isActive: true
            });
            if (role) {
                console.log('================= role created ============');
                success = true;
            }
            return {
                role,
                success
            };
        } catch (error) {
            console.log('=============role created error ==========', error);
            return { success: false };
        }
    }
};