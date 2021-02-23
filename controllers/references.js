const Reference = require("../models/references");
const User = require("../models/user");
const UserController = require("./user");
exports.postReference = async(req, res, next) => {
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
            let reference = await Reference.create(data);
            if (reference.success) {
                return res.status(200).json({
                    message: "Reference created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Reference creation failed...!",
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
        console.log("============ post reference controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.updateReference = async(req, res, next) => {
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
            let reference = await Reference.update(data);
            if (reference.success) {
                return res.status(200).json({
                    message: "Reference updated successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Reference updation failed...!",
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
        console.log("============ post update reference controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getUserReferences = async(req, res, next) => {
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
            let items = await Reference.fetchAllByUserId(userId);
            if (items) {
                return res.status(200).json({
                    message: "References fetched successfully...!",
                    "items": items,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "References fetching failed...!",
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
        console.log("============== get all reference by user id controller error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        });
    }
}
exports.getReferenceById = async(req, res, next) => {
    try {
        let referenceId = req.query.referenceId;
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
        let items = await Reference.fetchById(referenceId);
        if (items) {
            return res.status(200).json({
                message: "References fetched successfully...!",
                "reference": items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "References fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============== get  reference by  id controller error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        });
    }
}
exports.deleteReference = async(req, res, next) => {
    try {
        let referenceId = req.query.referenceId;
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
        let isDelete = await Reference.delete(referenceId);
        if (isDelete) {
            return res.status(200).json({
                message: "References deleted successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "References deletion failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("==============delete reference by id controller error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        });
    }
}