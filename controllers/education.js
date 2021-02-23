const Education = require("../models/education");
const User = require("../models/user");
const UserController = require("./user");
exports.postEducation = async(req, res, next) => {
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
            let education = await Education.create(data);
            if (education.success) {
                return res.status(200).json({
                    message: "Education created successfully...!",
                    hasError: false
                });
            } else {
                return res.status(200).json({
                    message: "Education creation failed...!",
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
        console.log("============= post education controller error ==================", error);
        return res.status(200).json({
            message: "Some error occured please try later...!",
            hasError: true
        })
    }
}

exports.updateEducation = async(req, res, next) => {
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
            let education = await Education.update(data);
            if (education.success) {
                return res.status(200).json({
                    message: "Education updated successfully...!",
                    hasError: false
                });
            } else {
                return res.status(200).json({
                    message: "Education updation failed...!",
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
        console.log("============= post update education controller error ==================", error);
        return res.status(200).json({
            message: "Some error occured please try later...!",
            hasError: true
        })
    }
}

exports.getEducationByUserId = async(req, res, next) => {
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
            let education = await Education.fetchAllByUserId(userId);
            if (education) {
                return res.status(200).json({
                    message: "Educations fetched successfully...!",
                    "items": education,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Educations fetching failed....!",
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
        console.log("====== education fetch by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEducationById = async(req, res, next) => {
    try {
        let userId = req.query.userId;
        let adminId = req.query.adminId;
        let educationId = req.query.educationId;
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
            let education = await Education.fetchById(educationId);
            if (education) {
                return res.status(200).json({
                    message: "Education fetched successfully...!",
                    education,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Education fetching failed....!",
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
        console.log("====== education fetch by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteEducation = async(req, res, next) => {
    try {
        let userId = req.query.userId;
        let adminId = req.query.adminId;
        let educationId = req.query.educationId;
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
            let education = await Education.delete(educationId);
            if (education) {
                return res.status(200).json({
                    message: "Education deleted successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Education deletion failed....!",
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
        console.log("====== education fetch by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}