const User = require('../models/user');
const becrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _helper = require('../_helpers/helper');
const uuid = require('uuid/v4')
const Profession = require('../models/profession');
const Profession2specialty = require('../models/profession2specialty');
const Device = require('../models/device');
const validator = require('../services/validator');
const ProfileType = require('../models/profileType');
const UserProfile = require('../models/userProfile');
const Email = require('../services/email');
const profession = require('../models/profession');
const Education = require('../models/education');
const References = require("../models/references");
const Certification = require('../models/certification');
const License = require('../models/license');
const Address = require("../models/addresses");
const Documents = require("../models/documents");
const Employer = require('../models/employer');
//================= User Api's Work =======================
//Signup User
exports.postUser = async(req, res, next) => {
    try {
        let data = req.body;
        let profession;
        let adminId = data.adminId;
        if (adminId) {
            let isAdmin = await this.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let professionName = data.professionName ? data.professionName : null;
        if (professionName) {
            profession = await Profession.fetchByName(data.professionName);
            if (!profession) {
                console.log("=========== Profession not found =================");
                failureResponce();
            }
        }
        let profileName = data.profileName ? data.profileName : null;
        let profile;
        if (profileName) {
            profile = await ProfileType.fetchByName(data.profileName);
            if (profile) {
                console.log("========= profile found ==============");

            } else {
                adminError();
            }
        }

        function adminError() {
            return res.status(200).json({
                message: `${data.profileName} sign up profileName error please try later...!`,
                hasError: true
            })
        }
        let userExist = await User.fetchByEmail(data.email);
        console.log(userExist);
        if (!userExist) {
            // let profession2specialty = await Profession2specialty.fetchByProfessionId(profession.professionId);
            if (true) {
                data = JSON.parse(JSON.stringify(data));
                if (profession) {
                    data.professionId = profession.id;
                    console.log("data afte professionId");
                }
                // data.specialtyId = profession2specialty.specialtyId;
                data.isActiveDevice = false;
                if (data.password) {
                    data.password = await becrypt.hash(data.password, 12);
                }
                let { user } = await User.create(data);
                if (user) {
                    data = JSON.parse(JSON.stringify(data));
                    data.entityId = user.id;
                    data.entityType = "user";
                    let addressLine1 = data.addressLine1 ? data.addressLine1 : null;
                    let employerName = data.employerName ? data.employerName : null;
                    if (addressLine1) {
                        let adddress = await Address.create(data);
                        if (adddress.success) {
                            let employer = await Employer.fetchEmployerBySearch(data);
                            if (employer || true) {
                                data.userId = user.id;
                                let license = await License.create(data);
                                if (license.success) {
                                    return res.status(200).json({
                                        message: "Professional created successfully...!",
                                        hasError: false
                                    })
                                } else {
                                    User.delete(user.id);
                                    Address.delete(adddress.addresses.id)
                                    return res.status(200).json({
                                        message: "Professional creation failed. false license data...!",
                                        hasError: true
                                    })
                                }
                            }
                        } else {
                            User.delete(user.id)
                            return res.status(200).json({
                                message: "Professional creation failed. address data missing...!",
                                hasError: false
                            })
                        }
                    }
                    // Address.create(data);
                    if (profile) {
                        let userProfileData = {
                            "userId": user.id,
                            "profileTypeId": profile.id
                        }
                        let userProfile = await UserProfile.create(userProfileData);
                        if (!userProfile) {
                            adminError();
                        }
                    }
                    let deviceData = {
                        deviceCode: data.deviceCode,
                        userId: user.id
                    }
                    let device = await validator.checkKnownDevice(deviceData);
                    if (device) {
                        device.lastLocation = data.lastLocation;
                        let isUpdate = await Device.updateActivity(deviceData);
                    } else {
                        let newDevice = await Device.create(deviceData);
                    }
                    let pinCode = await _helper.generatePin();
                    let emailData = {
                        "name": data.fullName,
                        "email": data.email,
                        pinCode,
                        subject: "Confirmation Code"
                    }
                    await User.updateCreatedBy(user.id);
                    await User.updatePinCode(user.id, pinCode);
                    Email.sendPinMail(emailData);
                    return res.status(200).json({
                        message: "User signup successfully...!",
                        isTwoFactorEnabled: true,
                        hasError: false,
                        userId: user.id
                    })
                } else {
                    console.log("=========== User not created =================");
                    failureResponce();
                }
            } else {
                failureResponce();
            }
        } else {
            return res.status(200).json({
                message: "User already exists...!",
                hasError: true
            })
        }

        function failureResponce() {
            return res.status(200).json({
                message: "User failed to signup...!",
                hasError: true
            })
        }
    } catch (error) {
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.verifyUserPin = async(req, res, next) => {
    try {
        const { userId, pinCode, deviceCode } = req.body;
        if (userId && pinCode && deviceCode) {
            let isVerified = await User.verifyPin(userId, pinCode);
            if (isVerified) {
                let user = await User.fetchById(userId);
                let emailData = {
                    name: user.firstName + " " + user.lastName,
                    email: user.email,
                    subject: "Login Alert"
                }
                await User.updatePinCode(userId, null);
                await Device.enableDevice(userId, deviceCode);
                Email.sendWelcomeMail(emailData);
                return res.status(200).json({
                    message: "Pin verified successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Wrong pin entered...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Required fields are missing...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log('=============== verify user pin controller error =================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.resendPin = async(req, res, next) => {
    try {
        const { userId, deviceCode } = req.body;
        if (userId && deviceCode) {
            let user = await User.fetchById(userId);
            if (user) {
                let device = await Device.fetchByUserAndDeviceId(userId, deviceCode);
                if (device) {
                    let pinCode = await _helper.generatePin();
                    let emailData = {
                        "name": user.firstName + " " + user.lastName,
                        "email": user.email,
                        pinCode,
                        subject: "Confirmation Code"
                    }
                    await User.updatePinCode(userId, pinCode);
                    Email.sendPinMail(emailData);
                    return res.status(200).json({
                        message: "Pin regenerated check email...!",
                        hasError: false
                    });
                } else {
                    return res.status(200).json({
                        message: "Request sent from wrong device...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "User not found...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Required fields are missing...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log('=============== resent user pin controller error =================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postLogin = async(req, res, next) => {
    try {
        let data = req.body;
        let user = await User.fetchByEmail(data.email);
        if (user) {
            let matched = await _helper.matchPassword(data.password, user.password);
            if (matched) {
                let device = await Device.fetchByUserAndDeviceId(user.id, data.deviceCode);
                if (device) {
                    device.lastLocation = data.lastLocation;
                    await Device.updateActivity(device);
                    let checkEnableDevice = await Device.checkEnable(user.id, data.deviceCode);
                    if (checkEnableDevice) {
                        return res.status(200).json({
                            message: "User login successfully...!",
                            isTwoFactorEnabled: false,
                            userId: user.id,
                            hasError: false
                        })
                    } else {
                        let pinCode = await _helper.generatePin();
                        await User.updatePinCode(user.id, pinCode);
                        await Device.updateActivity(device);
                        return res.status(200).json({
                            message: "Please enter 6 digit pin code send to your email address...!",
                            isTwoFactorEnabled: true,
                            hasError: false
                        })
                    }
                } else {
                    let deviceData = {
                        userId: user.id,
                        deviceName: data.deviceName,
                        deviceCode: data.deviceCode,
                        lastLocation: data.lastLocation
                    }
                    let newDevice = await Device.create(deviceData);
                    let pinCode = await _helper.generatePin();
                    await User.updatePinCode(user.id, pinCode);
                    await Device.updateActivity(device);
                    return res.status(200).json({
                        message: "Please enter 6 digit pin code send to your email address...!",
                        isTwoFactorEnabled: true,
                        hasError: false
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Password is incorrect...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Email of user doesn't exist...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("================== user postLogin controller error ==================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getUserProfiles = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        console.log("adminId", adminId);

        if (adminId) {
            let isAdmin = await this.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let userId = req.query.userId;
        let userProfiles = await UserProfile.fetchAllByUserId(userId);
        let profiles = [];
        if (userProfiles) {
            for (let i = 0; i < userProfiles.length; i++) {
                let userProfile = userProfiles[i];
                let profileType = await ProfileType.fetchById(userProfile.profileTypeId);
                if (profileType) {
                    profiles.push(profileType);
                }
            }
            return res.status(200).json({
                message: "Profiles fetched successfully...!",
                items: profiles,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Profiles fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("=========== get user profiles controller error ==============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getProfessionalUsers = async(req, res, next) => {
    try {
        let userId = req.query.userId;
        let user = await User.fetchById(userId);
        if (userId != "") {
            // let userProfile = await UserProfile.fetchAllByUserId(userId);
            // if (userProfile) {
            let professions = await User.fetchUsersByProfession();
            if (professions) {
                return res.status(200).json({
                    message: "Professionals fetched successfully...!",
                    items: professions,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "No professionals found...!",
                    hasError: true
                })
            }
            // } else {
            //     return res.status(200).json({
            //         message: "Your profile not found. Invalid request...!",
            //         hasError: true
            //     })
            // }
        } else {
            return res.status(200).json({
                message: "User not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("==== get professional users ========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.updateProfessionalUser = async(req, res, next) => {
    try {
        let data = req.body;
        let admin = await User.fetchNonProfessionalUser(data.adminId);
        if (admin) {
            let userProfile = await UserProfile.fetchByUserId(data.adminId);
            if (userProfile) {
                let isUpdated = await User.updateProfessionalUser(data);
                if (isUpdated) {
                    let user = await User.fetchById(data.userId);
                    return res.status(200).json({
                        message: "Professional user updated successfully...!",
                        user,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Professional user updation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Wrong admin user no profile exist. Invalid request...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Admin not found. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("========== update professional user api ==========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.searchEmail = async(req, res, next) => {
    try {
        let email = req.query.email;
        let user = await User.fetchByEmail(email);
        if (user) {
            let pinCode = await _helper.generatePin();
            await User.updatePinCode(user.id, pinCode);
            return res.status(200).json({
                message: "Please enter 6 digit pin code send to your email address...!",
                id: user.id,
                isTwoFactorEnabled: true,
                hasError: false
            });
        } else {
            return res.status(200).json({
                message: "User of that email does not exist...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("========== serach email user api ==========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.resetPassword = async(req, res, next) => {
    try {
        let data = req.body;
        let user = await User.fetchById(data.userId);
        if (user) {
            data = JSON.parse(JSON.stringify(data));
            data.password = await becrypt.hash(data.newPassword, 12);
            let isUpdate = await User.updatePassword(data.userId, data.password);
            if (isUpdate) {
                return res.status(200).json({
                    message: "Passowrd reset successfully. Please login again with new password...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Password reset failed...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "User not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== reset password controller error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.fetchProfessionalUserProfile = async(req, res, next) => {
    try {
        let data = req.query;
        let admin = await User.fetchNonProfessionalUser(data.adminId);
        if (admin) {
            let userProfile = await UserProfile.fetchByUserId(data.adminId);
            if (userProfile) {
                let user = await User.fetchById(data.userId);
                if (user) {
                    console.log(user);
                    user = JSON.parse(JSON.stringify(user));
                    let educations = await Education.fetchAllByUserId(user.id);
                    let certifications = await Certification.fetchAllByUserId(user.id);
                    let licences = await License.fetchAllByUserId(user.id);
                    let references = await References.fetchAllByUserId(user.id);
                    let address = await Address.fetchByUserId(user.id);
                    let profession = await Profession.fetchById(user.professionId);
                    user.phone = address ? address.phone : "Phone number missing...!";
                    user.city = address ? address.city : "City is missing...!";
                    user.location = address ? address.addressLine1 : "Address is missing...!";
                    user.profession = profession ? profession.professionName : "";
                    user.specialty = "Specialty is missing...!";
                    return res.status(200).json({
                        message: "User profile fetched successfully...!",
                        "profile": {
                            user,
                            educations,
                            certifications,
                            licences,
                            references
                        },
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "No user found...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Wrong admin user no profile exist. Invalid request...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "No admin user found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== fetch professional user profile controller error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.fetchAdminUser = async(req, res, next) => {
    try {
        let id = req.query.adminId;
        let isAdmin = await this.isAdminUser(id);
        if (isAdmin) {
            let user = await User.fetchById(id);
            if (user) {
                return res.status(200).json({
                    message: "Admin found successfully...!",
                    user,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Admin not found...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrong admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== fetch admin user profile controller error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.fetchAdminUsers = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await this.isAdminUser(adminId);
        if (isAdmin) {
            let users = await User.fetchAllNonProfessionalUsers(adminId);
            return res.status(200).json({
                message: "Users fetched successfully...!",
                "items": users,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Wrong admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== fetch admin users controller error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.fetchProfessionalUsersBySearch = async(req, res, next) => {
        try {
            let adminId = req.body.adminId;
            let { firstName, lastName, email, professionId } = req.body;
            let isAdmin = await this.isAdminUser(adminId);
            if (isAdmin) {
                let users = await User.fetchBySearch(firstName, lastName, email, professionId);
                return res.status(200).json({
                    message: "Professionals fetched successfully...!",
                    "items": users,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        } catch (error) {
            console.log("===== fetch admin users controller error ======", error);
            return res.status(200).json({
                message: "Some error occurred please try later...!",
                hasError: true
            })
        }
    }
    /// helper functions of user
exports.isAdminUser = async(adminId) => {
    try {
        let admin = await User.fetchNonProfessionalUser(adminId);
        console.log(admin);
        if (admin) {
            let userProfile = await UserProfile.fetchByUserId(adminId);
            if (userProfile) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("========helper error ==========", error)
        return false;
    }
}
exports.removeNonProfessionalUser = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await this.isAdminUser(adminId);
        if (isAdmin) {
            let userId = await req.query.userId;
            if (userId !== adminId) {
                let isUserAdmin = await this.isAdminUser(userId);
                if (isUserAdmin) {
                    let isNotSystemAdmin = await User.fetchNonProfessionalForDelete(userId);
                    if (isNotSystemAdmin) {
                        let isDelete = await User.delete(userId);
                        if (isDelete) {
                            let items = await User.fetchAllNonProfessionalUsers(adminId);
                            return res.status(200).json({
                                message: "Admin user deleted successfully...!",
                                items,
                                hasError: false
                            })
                        } else {
                            return res.status(200).json({
                                message: "Admin user deletion failed....!",
                                hasError: true
                            })
                        }
                    } else {
                        return res.status(200).json({
                            message: "System admin cannot be deleted...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "User to be deleted is not admin...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "User should not be the current admin user...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrong admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== delete admin user controller error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.updateAdminUser = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await this.isAdminUser(adminId);
        if (isAdmin) {
            let userId = data.userId;
            let user = await this.isAdminUser(userId);
            if (user) {
                let isUpdate = await User.updateNonProfessionalUser(data);
                if (isUpdate) {
                    return res.status(200).json({
                        message: "User updated successfully...!",
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "User updation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "User to be update is not admin user...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrong admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== delete admin user controller error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}