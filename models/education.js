const Sequelize = require('sequelize');

const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { User } = require('./user');
const Education = sequelize.define('education', {
    id: {
        type: Sequelize.STRING,
        allow0: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    degree: Sequelize.STRING,
    schoolName: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    startDate: Sequelize.DATE,
    graduationDate: Sequelize.DATE,
    attending: Sequelize.BOOLEAN,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN
});
module.exports = {
    Education,
    fetchAll: async() => {
        try {
            let education = await Education.findAll({
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
            return education;
        } catch (error) {
            console.log('=============Education fetch all error ==========', error);
            return [];
        }
    },
    fetchById: async(educationId) => {
        try {
            let education = await Education.findOne({
                where: {
                    id: educationId,
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
            return education;
        } catch (error) {
            console.log('=============Education fetch by id error ==========', error);
            return 0;
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let education = await Education.findAll({
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
            return education;
        } catch (error) {
            console.log("======= education fetch by user id error ==============", error);
            return 0;
        }
    },
    update: async(educationData) => {
        let success = false;
        try {
            let education = await Education.findOne({
                where: {
                    id: educationData.educationId,
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
            if (education) {
                console.log('================= Education found for update ============');
                education.schoolName = educationData.schoolName;
                education.city = educationData.city;
                education.state = educationData.state;
                education.postalCode = educationData.postalCode;
                education.degree = educationData.degree;
                education.graduationDate = educationData.graduationDate;
                education.startDate = educationData.startDate;
                education.attending = educationData.attending ? educationData.attending : false;
                education.updatedBy = educationData.adminId ? educationData.adminId : educationData.userId;
                await education.save();
                success = true;
            }
            return { success, education };
        } catch (error) {
            console.log('=============Education update error ==========', error);
            return { success: false };
        }
    },
    delete: async(educationId) => {
        let success = false;
        try {
            let education = await Education.findOne({
                where: {
                    id: educationId,
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
            if (education) {
                console.log('================= Education found for delete ============');
                education.isActive = false;
                await education.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============Education delete error ==========', error);
            return false;
        }
    },
    create: async(educationData) => {
        let success = false;
        try {
            let education = await Education.create({
                id: uuid(),
                userId: educationData.userId,
                schoolName: educationData.schoolName,
                city: educationData.city,
                degree: educationData.degree,
                state: educationData.state,
                postalCode: educationData.postalCode,
                graduationDate: educationData.graduationDate,
                startDate: educationData.startDate,
                attending: educationData.attending ? educationData.attending : false,
                createdBy: educationData.adminId ? educationData.adminId : educationData.userId,
                isActive: true
            });
            if (education) {
                console.log('================= Education created ============');
                success = true;
            }
            return {
                education,
                success
            };
        } catch (error) {
            console.log('=============Education created error ==========', error);
            return { success: false };
        }
    }
};