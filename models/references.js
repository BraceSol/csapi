const Sequelize = require('sequelize');

const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { User } = require("./user")
const References = sequelize.define('references', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    referenceName: Sequelize.STRING,
    referenceEmail: Sequelize.STRING,
    referencePhone: Sequelize.STRING,
    referenceTitle: Sequelize.STRING,
    referenceEmployer: Sequelize.STRING,
    contactMethod: Sequelize.STRING,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    References,
    fetchAll: async() => {
        try {
            let references = await References.findAll({
                where: {
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
            return references;
        } catch (error) {
            console.log('======References Fetched by all error', error);
            return [];
        }
    },
    fetchById: async(referencesId) => {
        try {
            let references = await References.findOne({
                where: {
                    id: referencesId,
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
            return references;
        } catch (error) {
            console.log('=====References Fetched by Id error=====', error);
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let reference = await References.findAll({
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
            return reference;
        } catch (error) {
            console.log("====== fetch all by user id reference model error ============", error);
            return null;
        }
    },
    update: async(referencesData) => {
        let success = false;
        try {
            let references = await References.findOne({
                where: {
                    id: referencesData.referenceId,
                    isActive: true
                }
            });
            if (references) {
                console.log('====References found for updating=====');
                references.referenceName = referencesData.referenceName;
                references.referenceEmail = referencesData.referenceEmail;
                references.referencePhone = referencesData.referencePhone;
                references.referenceTitle = referencesData.referenceTitle;
                references.referenceEmployer = referencesData.referenceEmployer;
                references.contactMethod = referencesData.contactMethod;
                references.updatedBy = referencesData.adminId ? referencesData.adminId : referencesData.userId;
                await references.save();
                success = true;
            }
            return { references, success };
        } catch (error) {
            console.log('=====References Updating Error======', error);
            return { success: false };
        }
    },
    delete: async(referencesId) => {
        let success = false;
        try {
            let references = await References.findOne({
                where: {
                    id: referencesId,
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
            if (references) {
                console.log('======References Found for Delete=========');
                references.isActive = false;
                await references.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('====References Deleting Error====', error);
            return false;
        }
    },
    create: async(referencesData) => {
        let success = false;
        try {
            let references = await References.create({
                id: uuid(),
                userId: referencesData.userId,
                referenceName: referencesData.referenceName,
                referenceEmail: referencesData.referenceEmail,
                referencePhone: referencesData.referencePhone,
                referenceTitle: referencesData.referenceTitle,
                referenceEmployer: referencesData.referenceEmployer,
                contactMethod: referencesData.contactMethod,
                createdBy: referencesData.adminId ? referencesData.adminId : referencesData.userId,
                isActive: true
            });
            if (references) {
                console.log('======References Successfully Created =====');
                success = true;
            }
            return { references, success };
        } catch (error) {
            console.log('===References Creating Error ====', error);
            return { success: false }
        }
    }
}