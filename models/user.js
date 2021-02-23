const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const _helper = require('../_helpers/helper');
const sequelize = require('../utils/database');
const { UserProfile } = require('./userProfile');
const { Profession } = require('./profession');
const { ProfileType } = require('./profileType');
const { where } = require('sequelize');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid()
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    prefix: Sequelize.STRING,
    firstName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    suffix: Sequelize.STRING,
    twoFactorEnabled: Sequelize.BOOLEAN,
    referralCode: Sequelize.STRING,
    resetToken: Sequelize.STRING,
    pinCode: Sequelize.INTEGER,
    statusCode: Sequelize.INTEGER,
    professionId: Sequelize.STRING,
    specialtyIds: Sequelize.JSON,
    createdBy: Sequelize.STRING,
    updatedBy: Sequelize.STRING,
    googleLoginId: Sequelize.STRING,
    linkedinLoginId: Sequelize.STRING,
    facebookLoginId: Sequelize.STRING,
    isActive: Sequelize.BOOLEAN,
});

module.exports = {
    User,
    fetchAll: async() => {
        try {
            let user = await User.findAll({
                where: {
                    isActive: true
                },
                include: [{
                    model: UserProfile,
                    attributes: ['profileTypeId'],
                    where: {
                        id: {
                            [Sequelize.Op.ne]: null
                        },
                        isActive: true
                    },
                    include: [{
                        model: ProfileType,
                        attributes: ['profileName'],
                        where: {
                            id: {
                                [Sequelize.Op.ne]: null
                            },
                            profileName: 'Professional',
                            isActive: true
                        }
                    }]
                }]
            });
            return user;
        } catch (error) {
            console.log('=============User fetch all error ==========', error);
            return [];
        }
    },
    fetchAllNonProfessionalUsers: async(id) => {
        try {
            let users = await User.findAll({
                where: {
                    id: {
                        [Sequelize.Op.ne]: id
                    },
                    professionId: null,

                    isActive: true
                },
                include: [{
                    model: UserProfile,
                    attributes: ['profileTypeId'],
                    where: {
                        id: {
                            [Sequelize.Op.ne]: null
                        },
                        isActive: true
                    },
                    include: [{
                        model: ProfileType,
                        attributes: ['profileName'],
                        where: {
                            id: {
                                [Sequelize.Op.ne]: null
                            },
                            profileName: {
                                [Sequelize.Op.ne]: 'Professional'
                            },
                            isActive: true
                        }
                    }]
                }]
            });
            return users;
        } catch (error) {
            console.log("===== fetchAllNonProfessionalUsers error =======", error);
            return 0;
        }
    },
    fetchById: async(userId) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    isActive: true
                }
            });
            return user;
        } catch (error) {
            console.log('=============User fetch by id error ==========', error);
        }
    },
    updateCreatedBy: async(userId) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    isActive: true
                }
            });
            if (user) {
                user.createdBy = userId;
                await user.save();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("======= user updateCreatedBy model error ==========", error);
            return false;
        }
    },
    update: async(userData) => {
        let success = false;
        try {
            let user = await User.findOne({
                where: {
                    id: userData.userId,
                    isActive: true
                }
            });
            if (user) {
                console.log('================= User found for update ============');
                user.password = userData.password;
                user.prefix = userData.prefix ? userData.prefix : "";
                user.firstName = userData.firstName;
                user.middleName = userData.middleName ? userData.middleName : "";
                user.lastName = userData.lastName;
                user.twoFactorEnabled = userData.twoFactorEnabled;
                user.referralCode = userData.referralCode ? userData.referralCode : "";
                user.resetToken = userData.resetToken ? userData.resetToken : "";
                user.statusCode = userData.statusCode ? userData.statusCode : null;
                user.specialtyId = userData.specialtyId ? userData.specialtyId : null;
                user.professionId = userData.professionId;
                user.updatedBy = userData.adminId;
                user.googleLoginId = userData.googleLoginId ? userData.googleLoginId : "";
                user.linkedinLoginId = userData.linkedinLoginId ? userData.linkedinLoginId : "";
                user.facebookLoginId = userData.facebookLoginId ? userData.facebookLoginId : "";
                user.isActive = userData.isActive;
                await user.save();
                success = true;
            }
            return { success, user };
        } catch (error) {
            console.log('=============User update error ==========', error);
            return { success: false };
        }
    },
    updateProfessionalUser: async(data) => {
        try {
            let user = await User.findOne({
                where: {
                    id: data.userId,
                    professionId: {
                        [Sequelize.Op.ne]: null
                    },
                    isActive: true
                },
                include: [{
                    model: UserProfile,
                    attributes: ['profileTypeId'],
                    where: {
                        id: {
                            [Sequelize.Op.ne]: null
                        },
                        isActive: true
                    },
                    include: [{
                        model: ProfileType,
                        attributes: ['profileName'],
                        where: {
                            id: {
                                [Sequelize.Op.ne]: null
                            },
                            profileName: 'Professional',
                            isActive: true
                        }
                    }]
                }]
            });
            if (user) {
                user.firstName = data.firstName;
                user.email = data.email;
                user.lastName = data.lastName;
                user.professionId = data.professionId;
                user.updatedBy = data.adminId;
                user.specialtyIds = data.specialtyIds ? data.specialtyIds : null;
                await user.save();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("====== update professionalUserError ======", error);
            return false;
        }
    },
    updateNonProfessionalUser: async(data) => {
        try {
            let user = await User.findOne({
                where: {
                    id: {
                        [Sequelize.Op.ne]: data.userId
                    },
                    professionId: null,

                    isActive: true
                },
                include: [{
                    model: UserProfile,
                    attributes: ['profileTypeId'],
                    where: {
                        profileTypeId: {
                            [Sequelize.Op.ne]: null
                        },
                        userId: {
                            [Sequelize.Op.ne]: null
                        },
                        isActive: true
                    },
                    include: [{
                        model: ProfileType,
                        attributes: ['profileName'],
                        where: {
                            id: {
                                [Sequelize.Op.ne]: null
                            },
                            profileName: {
                                [Sequelize.Op.ne]: 'Professional'
                            },
                            isActive: true
                        }
                    }]
                }]
            });
            if (user) {
                console.log("user found======");
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                console.log("here", data.firstName, data.lastName, user.firstName, user.lastName);
                await user.save();
                return true;
            } else {
                console.log("no user found======");
                return false;
            }
        } catch (error) {
            console.log("====== update NonprofessionalUserError ======", error);
            return false;
        }
    },
    updatePassword: async(userId, password) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    isActive: true
                }
            });
            if (user) {
                user.password = password;
                await user.save();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("====== update password model error =======", error);
            return false;
        }
    },
    fetchNonProfessionalUser: async(userId) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    professionId: null,
                    isActive: true
                },
                include: [{
                    model: UserProfile,
                    attributes: ['profileTypeId'],
                    where: {
                        id: {
                            [Sequelize.Op.ne]: null
                        },
                        isActive: true
                    },
                    include: [{
                        model: ProfileType,
                        attributes: ['profileName'],
                        where: {
                            id: {
                                [Sequelize.Op.ne]: null
                            },
                            profileName: {
                                [Sequelize.Op.ne]: 'Professional'
                            },
                            isActive: true
                        }
                    }]
                }]
            });
            return user;
            console.log(user)
        } catch (error) {
            console.log("===== fetch non professional user error =======", error);
            return null
        }
    },
    fetchUsersByProfession: async() => {
        try {
            let users = await User.findAll({
                where: {
                    professionId: {
                        [Sequelize.Op.ne]: null
                    },
                    isActive: true
                }
            })
            return users;
        } catch (error) {
            console.log("===== fetch user by profession model error ======", error);
            return null;
        }
    },
    fetchByUserAndPin: async(userId, pin) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    pinCode: pin
                }
            });
            return user;
        } catch (error) {
            console.log('================= fetch by user and pin code error =====================', error);
            return null;
        }
    },
    fetchByEmail: async(email) => {
        try {
            let user = await User.findOne({
                where: {
                    email: email,
                    isActive: true
                }
            });
            return user;
        } catch (error) {
            console.log("=============== fetch by email error =================", error);
            return null;
        }
    },
    updatePinCode: async(userId, pin) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    isActive: true
                }
            });
            if (user) {
                user.pinCode = pin;
                await user.save();
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log('============================= update pin code ========================', error);
            return false;
        }
    },
    verifyPin: async(userId, pin) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    pinCode: pin
                }
            });
            if (user) {
                return true;
            } else {
                console.log("================= no user found of pin ==================");
                return false;
            }
        } catch (error) {
            console.log('================== verify pin error ====================', error);
            return false;
        }
    },
    fetchBySearch: async(firstName, lastName, email, professionId, specialtyId) => {
        try {
            let queryObject = {};
            queryObject.where = {};
            queryObject.where.isActive = true;
            if (firstName) {
                queryObject.where.firstName = {
                    [Sequelize.Op.substring]: firstName
                };
            }
            if (lastName) {
                queryObject.where.lastName = {
                    [Sequelize.Op.substring]: lastName
                };
            }
            if (email) {
                queryObject.where.email = {
                    [Sequelize.Op.substring]: email
                };
            }
            if (professionId) {
                queryObject.where.professionId = professionId;
            }
            let users = await User.findAll({
                where: queryObject.where
            });
            return users
        } catch (error) {
            console.log('================== professional search error ====================', error);
            return [];
        }
    },
    delete: async(userId) => {
        let success = false;
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    isActive: true
                }
            });
            if (user) {
                console.log('================= User found for delete ============');
                user.isActive = false;
                await user.save();
                success = true;
            }
            return success;
        } catch (error) {
            console.log('=============User delete error ==========', error);
            return false;
        }
    },
    fetchNonProfessionalForDelete: async(userId) => {
        try {
            let user = await User.findOne({
                where: {
                    id: userId,
                    professionId: null,
                    isActive: true
                },
                include: [{
                    model: UserProfile,
                    attributes: ['profileTypeId'],
                    where: {
                        id: {
                            [Sequelize.Op.ne]: null
                        },
                        isActive: true
                    },
                    include: [{
                        model: ProfileType,
                        attributes: ['profileName'],
                        where: {
                            id: {
                                [Sequelize.Op.ne]: null
                            },
                            profileName: {
                                [Sequelize.Op.ne]: "System"
                            }
                        }
                    }]
                }]
            });
            return user;
            console.log(user)
        } catch (error) {
            console.log("===== fetch non professional user error =======", error);
            return null
        }
    },
    create: async(userData) => {
        let success = false;
        try {
            let fullName = _helper.sperateName(userData.fullName);
            let fullNameString;
            await fullName.then(async(nameArray) => {
                console.log(nameArray);
                fullNameString = nameArray;
            })
            console.log(fullNameString);
            let user = await User.create({
                id: uuid(),
                email: userData.email,
                password: userData.password ? userData.password : null,
                prefix: userData.prefix ? userData.prefix : "",
                firstName: fullNameString[0] ? fullNameString[0] : "",
                middleName: userData.middleName ? userData.middleName : "",
                lastName: fullNameString[1] ? fullNameString[1] : "",
                suffix: userData.suffix ? userData.suffix : "",
                twoFactorEnabled: userData.twoFactorEnabled ? userData.twoFactorEnabled : true,
                referralCode: userData.referralCode ? userData.referralCode : "",
                resetToken: userData.resetToken ? userData.resetToken : "",
                statusCode: userData.statusCode ? userData.statusCode : null,
                professionId: userData.professionId ? userData.professionId : null,
                specialtyIds: userData.specialtyIds ? userData.specialtyIds : null,
                createdBy: userData.adminId ? userData.adminId : null,
                googleLoginId: userData.googleLoginId ? userData.googleLoginId : "",
                linkedinLoginId: userData.linkedinLoginId ? userData.linkedinLoginId : "",
                facebookLoginId: userData.facebookLoginId ? userData.facebookLoginId : "",
                isActive: true
            });
            if (user) {
                console.log('================= User created ============');
                success = true;
            }
            return {
                user,
                success
            };
        } catch (error) {
            console.log('=============User create error ==========', error);
            return { success: false };
        }
    }
}