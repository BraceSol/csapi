const License = require("../models/license");
const User = require("../models/user");
const UserController = require("./user");
exports.postLicense = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let user = await User.fetchById(data.userId);
        if (user) {
            let license = await License.create(data);
            if (license.success) {
                return res.status(200).json({
                    message: "Licence created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "License creation failed...!"
                })
            }
        } else {
            return res.status(200).json({
                message: "User not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("================ post license error ============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.updateLicense = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let user = await User.fetchById(data.userId);
        if (user) {
            let license = await License.update(data);
            if (license.success) {
                return res.status(200).json({
                    message: "Licence updated successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "License updation failed...!"
                })
            }
        } else {
            return res.status(200).json({
                message: "User not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("================ post license update error ============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getLicenseByUserId = async(req, res, next) => {
    try {
        let userId = req.query.userId;
        let adminId = req.query.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let user = await User.fetchById(userId);
        if (user) {
            let license = await License.fetchAllByUserId(userId);
            if (license) {
                return res.status(200).json({
                    message: "Licenses fetched successfully...!",
                    "items": license,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Licenses fetching failed....!",
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
        console.log("====== License fetch all by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getLicenseById = async(req, res, next) => {
    try {
        let licenseId = req.query.licenseId;
        let adminId = req.query.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let license = await License.fetchById(licenseId);
        if (license) {
            return res.status(200).json({
                message: "License fetched successfully...!",
                license,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "License fetching failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== License fetch by license id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteLicense = async(req, res, next) => {
    try {
        let licenseId = req.query.licenseId;
        let adminId = req.query.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let license = await License.delete(licenseId);
        if (license) {
            return res.status(200).json({
                message: "License deleted successfully...!",
                license,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "License deleting failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== License fetch by license id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}