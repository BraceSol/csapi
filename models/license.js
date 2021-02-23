const Sequelize = require('sequelize');

const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { User } = require('./user');
const License = sequelize.define('licenses', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    licenseState: Sequelize.STRING,
    licenseCode: Sequelize.STRING,
    issueDate: Sequelize.DATE,
    expirationDate: Sequelize.DATE,
    verifiedOn: Sequelize.DATE,
    verifiedBy: Sequelize.STRING,
    verificationMessage: Sequelize.STRING,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    License,
    fetchAll: async() => {
        try {
            let license = await License.findAll({
                where: {
                    isAtive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }]
            });
            return license;
        } catch (error) {
            console.log('======License fetch all fields====', error);
            return [];
        }
    },
    fetchById: async(licenseId) => {
        try {
            let license = await License.findOne({
                where: {
                    id: licenseId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }]
            });
            return license;
        } catch (error) {
            console.log('======Fetch By Id Error===', error);
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let license = await License.findAll({
                where: {
                    userId: userId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }]
            });
            return license;
        } catch (error) {
            console.log("====== license fetch all by user id error ============", error);
            return null;
        }
    },
    update: async(licenseData) => {
        let success = false;
        try {
            let license = await License.findOne({
                where: {
                    id: licenseData.licenseId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (license) {
                console.log('=====License Found For Update====');
                license.licenseState = licenseData.licenseState;
                license.licenseCode = licenseData.licenseCode;
                license.issueDate = licenseData.issue;
                license.expirationDate = licenseData.expirationDate;
                license.verifiedOn = licenseData.verifiedOn;
                license.verifiedBy = licenseData.verifiedBy;
                license.verificationMessage = licenseData.verificationMessage;
                license.updatedBy = licenseData.adminId ? licenseData.adminId : licenseData.userId;
                await license.save();
                success = true;
            }
            return { success, license };
        } catch (error) {
            console.log('====License Update error====');
            return { success: false };
        }
    },
    delete: async(licenseId) => {
        let success = false;
        try {
            let license = await License.findOne({
                where: {
                    id: licenseId,
                    isActive: true
                },
                include: [{
                    model: User,
                    attributes: ["firstName", "lastName", "email"],
                    where: {
                        isActive: true
                    }
                }]
            });
            if (license) {
                console.log('=====License Found For Delete====');
                license.isActive = false;
                await license.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('======License Deleting error========', error);
            return false;
        }
    },
    create: async(licenseData) => {
        let success = false;
        try {
            let license = await License.create({
                id: uuid(),
                userId: licenseData.userId,
                licenseState: licenseData.licenseState,
                licenseCode: licenseData.licenseCode ? licenseData.licenseCode : licenseData.lincenseNumber,
                issueDate: licenseData.issueDate,
                expirationDate: licenseData.expirationDate,
                verifiedBy: licenseData.verifiedBy ? licenseData.verifiedBy : null,
                verifiedOn: licenseData.verifiedOn ? licenseData.verifiedOn : null,
                verificationMessage: licenseData.verificationMessage ? licenseData.verificationMessage : null,
                createdBy: licenseData.adminId ? licenseData.adminId : licenseData.userId,
                isActive: true
            });
            if (license) {
                console.log('========License Created======');
                success = true;
            }
            return { license, success };
        } catch (error) {
            console.log('======License Creating error======', error);
            return { success: false };
        }
    }
}