const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { User } = require('./user');
const Device = sequelize.define('device', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    deviceName: Sequelize.STRING,
    deviceCode: Sequelize.STRING,
    enabled: Sequelize.BOOLEAN,
    lastActivity: Sequelize.DATE,
    lastLocation: Sequelize.STRING,
    statusCode: Sequelize.INTEGER,
    isActive: Sequelize.BOOLEAN,
});
module.exports = {
    Device,
    fetchAll: async() => {
        try {
            let device = await Device.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ['email', 'isActive'],
                    where: {
                        isActive: true
                    }
                }]
            });
            return device;
        } catch (error) {
            console.log('=============Device fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(deviceId) => {
        try {
            let device = await Device.findOne({
                where: {
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ['email', 'isActive'],
                    where: {
                        isActive: true
                    }
                }]
            });
            return device;
        } catch (error) {
            console.log('=============Device fetch byid error ==========', error);
            return 0;
        }
    },
    fetchByUserId: async(userId) => {
        try {
            let device = await Device.findOne({
                where: {
                    userId: userId,
                    isActive: true
                }
            });
            return device;
        } catch (error) {
            console.log('=============Device fetch by id error ==========', error);
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let device = await Device.findAll({
                where: {
                    userId: userId,
                    isActive: true
                }
            });
            return device;
        } catch (error) {
            console.log('=============Device fetchall by id error ==========', error);
        }
    },
    fetchByUserAndDeviceId: async(userId, deviceCode) => {
        try {
            let device = await Device.findOne({
                where: {
                    userId: userId,
                    deviceCode: deviceCode,
                    isActive: true
                }
            })
            return device;
        } catch (error) {
            console.log('================fetch by user and device id error ================', error)
        }
    },
    update: async(deviceData) => {
        let success = false;
        try {
            let device = await Device.findOne({
                where: {
                    id: deviceData.deviceId,
                    isActive: true
                }
            });
            if (device) {
                console.log('================= device found for update ============');
                device.userId = deviceData.userId;
                device.deviceName = deviceData.deviceName;
                device.deviceCode = deviceData.deviceCode;
                device.enabled = device.enabled;
                device.lastActivity = deviceData.lastActivity ? deviceData.lastActivity : null;
                device.lastLocation = deviceData.lastLocation ? deviceData.lastLocation : null;
                device.statusCode = deviceData.statusCode ? deviceData.statusCode : null;
                await device.save();
                success = true;
            }
            return { success, device };
        } catch (error) {
            console.log('=============Device update error ==========', error);
            return { success: false };
        }
    },
    updateActivity: async(data) => {
        try {
            data.lastActivity = new Date();
            await data.save();
            return true;
        } catch (error) {
            console.log('=========== Update last activity error ================', error);
            return false;
        }
    },
    delete: async(deviceId) => {
        let success = false;
        try {
            let device = await Device.findOne({
                where: {
                    id: deviceId,
                    isActive: true
                }
            });
            if (device) {
                console.log('================= Device found for delete ============');
                device.isActive = false;
                await device.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Device delete error ==========', error);
            return false;
        }
    },
    enableDevice: async(userId, deviceCode) => {
        try {
            let device = await Device.findOne({
                where: {
                    userId: userId,
                    deviceCode: deviceCode,
                    isActive: true
                }
            })
            if (device) {
                device.enabled = true;
                await device.save();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("====================enable device error =====================", error);
            return false;
        }
    },
    checkEnable: async(userId, deviceCode) => {
        try {
            let device = await Device.findOne({
                where: {
                    userId: userId,
                    deviceCode: deviceCode,
                    isActive: true
                }
            });
            if (device) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log('================== check enable error =================', error);
            return false;
        }
    },
    create: async(deviceData) => {
        let success = false;
        try {
            let device = await Device.create({
                id: uuid(),
                userId: deviceData.userId,
                deviceName: deviceData.deviceName,
                deviceCode: deviceData.deviceCode,
                enabled: false,
                lastActivity: new Date(),
                lastLocation: deviceData.lastLocation,
                statusCode: deviceData.statusCode ? deviceData.statusCode : null,
                isActive: true
            });
            if (device) {
                console.log('================= Device created ============');
                success = true;
            }
            return {
                device,
                success
            };
        } catch (error) {
            console.log('=============Device created error ==========', error);
            return { success: false };
        }
    }
};