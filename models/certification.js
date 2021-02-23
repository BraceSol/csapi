const Sequelize = require('sequelize');

const uuid = require('uuid/v4');

const sequelize = require('../utils/database');
const { User } = require('./user');

const Certification = sequelize.define('certification', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    certificationName: Sequelize.STRING,
    issuingBody: Sequelize.STRING,
    issueDate: Sequelize.DATE,
    expirationDate: Sequelize.DATE,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    isActive: Sequelize.STRING
});
module.exports = {
    Certification,
    fetchAll: async() => {
        try {
            let certification = await Certification.findAll({
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
            return certification;
        } catch (error) {
            console.log('======Certification fetch all error====', error);
            return [];
        }
    },
    fetchById: async(certificationId) => {
        try {
            let certification = await Certification.findOne({
                where: {
                    id: certificationId,
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
            return certification;
        } catch (error) {
            console.log('=======Certification fetch by id error======', error);
        }
    },
    fetchAllByUserId: async(userId) => {
        try {
            let certifications = await Certification.findAll({
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
            return certifications;
        } catch (error) {
            console.log("====== fetch all by user id certification model error ============", error);
            return null;
        }
    },
    update: async(certificationData) => {
        let success = false;
        try {
            let certification = await Certification.findOne({
                where: {
                    id: certificationData.certificationId,
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
            if (certification) {
                console.log('======Certification found for update=======');
                certification.certificationName = certificationData.certificationName;
                certification.issuingBody = certificationData.issuingBody;
                certification.issueDate = certificationData.issueDate;
                certificationData.expirationDate = certificationData.expirationDate;
                certificationData.updatedBy = certificationData.adminId ? certificationData.adminId : certificationData.userId;
                await certification.save();
                success = true;
            }
            return { success: certification };
        } catch (error) {
            console.log('==========Certifiction Update Error', error);
            return { success: false };
        }
    },
    delete: async(certificationId) => {
        let success = false;
        try {
            let certification = await Certification.findOne({
                where: {
                    id: certificationId,
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
            if (certification) {
                console.log('======Certification found for deleting ');
                certification.isActive = true;
                await certification.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('======Certification deleting error======', error);
            return false;
        }
    },
    create: async(certificationData) => {
        let success = false;
        try {
            let certification = await Certification.create({
                id: uuid(),
                userId: certificationData.userId,
                certificationName: certificationData.certificationName,
                issuingBody: certificationData.issuingBody,
                issueDate: certificationData.issueDate,
                expirationDate: certificationData.expirationDate,
                createdBy: certificationData.adminId ? certificationData.adminId : certificationData.userId,
                isActive: true,

            });
            if (certificationData) {
                console.log('========Certification found for create======');
                success = true;
            }
            return { certification, success };
        } catch (error) {
            console.log('======Certification create error=========', error);
            return { success: false };
        }
    }
}