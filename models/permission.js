const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');

const Permission = sequelize.define('permissions', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    category: Sequelize.STRING,
    permissionCode: Sequelize.STRING,
    permissionName: Sequelize.STRING,
    description: Sequelize.STRING,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    Permission,
    fetchAll: async() => {
        try {
            let permissions = await Permission.findAll({
                where: {
                    isActive: true
                }
            });
            return permissions;
        } catch (error) {
            console.log('=============permission fetch all error ==========', error);
            return [];
        }
    },
    fetchByName: async(permissionData) => {
        try {
            let permission = await Permission.findOne({
                where: {
                    permission: permissionData,
                    isActive: true
                }
            });
            return permission;
        } catch (error) {
            console.log('=============permission fetch by name error ==========', error);
        }
    },
    fetchById: async(permissionId) => {
        try {
            let permission = await Permission.findOne({
                where: {
                    id: permissionId,
                    isActive: true
                }
            });
            return permission;
        } catch (error) {
            console.log('=============permission fetch by id error ==========', error);
        }
    },
    update: async(permissionData) => {
        let success = false;
        try {
            let permission = await Permission.findOne({
                where: {
                    id: permissionData.id,
                    isActive: true
                }
            });
            if (permission) {
                console.log('================= permission found for update ============');
                permission.category = permissionData.category;
                permission.permissionCode = permissionData.permissionCode;
                permission.permissionName = permissionData.permissionName;
                permission.description = permissionData.description;
                permission.updatedBy = permissionData.updatedBy;
                await permission.save();
                success = true;
            }
            return { success, permission };
        } catch (error) {
            console.log('=============permission update error ==========', error);
            return { success: false };
        }
    },
    delete: async(permissionId) => {
        let success = false;
        try {
            let permission = await Permission.findOne({
                where: {
                    id: permissionId,
                    isActive: true
                }
            });
            if (permission) {
                console.log('================= permission found for delete ============');
                permission.isActive = false;
                await permission.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============permission delete error ==========', error);
            return false;
        }
    },
    create: async(permissionData) => {
        let success = false;
        try {
            let permission = await Permission.create({
                id: uuid(),
                category: permissionData.category,
                permissionCode: permissionData.permissionCode,
                permissionName: permissionData.permissionName,
                description: permissionData.description,
                createdBy: permissionData.adminId,
                isActive: true
            });
            if (permission) {
                console.log('================= permission created ============');
                success = true;
            }
            return {
                permission,
                success
            };
        } catch (error) {
            console.log('=============permission created error ==========', error);
            return { success: false };
        }
    }
};