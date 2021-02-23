const UserProfileRoles = require("../models/userProfileRoles");
const UserProfile = require("../models/userProfile");
const Role = require("../models/role");
const userProfileRoles = require("../models/userProfileRoles");
const UserController = require("../controllers/user");

exports.postUserProfileRole = async(req, res, next) => {
    try {
        let data = req.body;
        let roleId = data.roleId;
        let userProfileId = data.userProfileId;
        let role = await Role.fetchById(roleId);
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            if (role) {
                let userProfile = await UserProfile.fetchById(userProfileId);
                if (userProfile) {
                    let newRole = await Role.create(data);
                    if (newRole.success) {
                        let userProfileRoles = await UserProfileRoles.fetchAllByUserProfileId(userProfileId);
                        return res.status(200).json({
                            message: "User profile role created...!",
                            userProfileRoles,
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "User profile role creation failed...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "User profile not found...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Role not found...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrond admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== user profile role create error ====");
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.updateUserProfileRole = async(req, res, next) => {
    try {
        let data = req.body;
        let roleId = data.roleId;
        let userProfileId = data.userProfileId;
        let role = await Role.fetchById(roleId);
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            if (role) {
                let userProfile = await UserProfile.fetchById(userProfileId);
                if (userProfile) {
                    let newRole = await Role.update(data);
                    if (newRole.success) {
                        let userProfileRoles = await UserProfileRoles.fetchAllByUserProfileId(userProfileId);
                        return res.status(200).json({
                            message: "User profile role updated...!",
                            "role": newRole,
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "User profile role updation failed...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "User profile not found...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Role not found...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrond admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== user profile role update error ====");
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteRole = async(req, res, next) => {
    try {

    } catch (error) {

    }
}