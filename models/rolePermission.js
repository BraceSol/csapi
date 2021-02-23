const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { Role } = require('./role');
const { Permission } = require('./permission');
const RolePermission = sequelize.define('rolePermission', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    accessLevel: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    RolePermission,
    fetchAll: async() => {
        try {
            let rolePermission = await RolePermission.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: Role,
                    attributes: ['roleName']
                }, {
                    model: Permission,
                    attributes: ['permissionName']
                }]
            });
            return rolePermission;
        } catch (error) {
            console.log('=============Role Permission fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(rolePermissionId) => {
        try {
            let rolePermission = await RolePermission.findOne({
                where: {
                    id: rolePermissionId,
                    isActive: true
                },
                include: [{
                    model: Role,
                    attributes: ['roleName']
                }, {
                    model: Permission,
                    attributes: ['permissionName']
                }]
            });
            return rolePermission;
        } catch (error) {
            console.log('=============Role Permission fetch by id error ==========', error);
        }
    },
    update: async(rolePermissionData) => {
        let success = false;
        try {
            let rolePermission = await RolePermission.findOne({
                where: {
                    id: rolePermissionData.rolePermissionId,
                    isActive: true
                },
                include: [{
                    model: Role,
                    attributes: ['roleName']
                }, {
                    model: Permission,
                    attributes: ['permissionName']
                }]
            });
            if (rolePermission) {
                console.log('================= role Permission found for update ============');
                rolePermission.roleId = rolePermissionData.roleId;
                rolePermission.permissionId = rolePermissionData.permissionId;
                rolePermission.accessLevel = rolePermissionData.accessLevel;
                rolePermission.isActive = rolePermissionData.isActive;
                await rolePermission.save();
                success = true;
            }
            return { success, rolePermission };
        } catch (error) {
            console.log('=============Role Permission update error ==========', error);
            return { success: false };
        }
    },
    delete: async(rolePermissionId) => {
        let success = false;
        try {
            let rolePermission = await RolePermission.findOne({
                where: {
                    id: rolePermissionId,
                    isActive: true
                },
                include: [{
                    model: Role,
                    attributes: ['roleName']
                }, {
                    model: Permission,
                    attributes: ['permissionName']
                }]
            });
            if (rolePermission) {
                console.log('================= Role Permission found for delete ============');
                rolePermission.isActive = false;
                await rolePermission.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Role Permission delete error ==========', error);
            return false;
        }
    },
    create: async(rolePermissionData) => {
        let success = false;
        try {
            let rolePermission = await UserProfile.create({
                id: uuid(),
                roleId: rolePermissionData.roleId,
                permissionId: rolePermissionData.permissionId,
                accessLevel: rolePermissionData.accessLevel,
                isActive: true
            });
            if (rolePermission) {
                console.log('================= RolePermission created ============');
                success = true;
            }
            return {
                rolePermission,
                success
            };
        } catch (error) {
            console.log('=============RolePermission created error ==========', error);
            return { success: false };
        }
    }
};