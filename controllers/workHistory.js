const WorkHistory = require("../models/workHistory");
const Profession = require("../models/profession");
const Specialty = require("../models/specialty");
const User = require("../models/user");
const UserController = require("./user");
//post workHistory
exports.postWorkHistory = async(req, res, next) => {
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
        let specialty;
        if (user) {
            if (user.professionId) {
                let specialtyName = data.specialtyName ? data.specialtyName : null;
                if (specialtyName) {
                    specialty = await Specialty.fetchByName(specialtyName);
                    if (specialty) {
                        data.specialtyId = specialty.id;
                    }
                }
                data.professionId = user.professionId ? user.professionId : null;
                let workHistory = await WorkHistory.create(data);
                if (workHistory.success) {
                    return res.status(200).json({
                        message: "Work history created successfully...!",
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Work history creation failed...!",
                        hasError: true
                    });
                }
            } else {
                return res.status(200).json({
                    message: "User profession not found...!",
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
        console.log("============== work history post controller error ===============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.updateWorkHistory = async(req, res, next) => {
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
        let specialty;
        if (user) {
            if (user.professionId) {
                let specialtyName = data.specialtyName ? data.specialtyName : null;
                if (specialtyName) {
                    specialty = await Specialty.fetchByName(specialtyName);
                    if (specialty) {
                        data.specialtyId = specialty.id;
                    }
                }
                data.professionId = user.professionId ? user.professionId : null;
                let workHistory = await WorkHistory.update(data);
                if (workHistory.success) {
                    return res.status(200).json({
                        message: "Work history updated successfully...!",
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Work history updation failed...!",
                        hasError: true
                    });
                }
            } else {
                return res.status(200).json({
                    message: "User profession not found...!",
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
        console.log("============== work history post update controller error ===============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getUserWorkHistory = async(req, res, next) => {
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
            let workHistory = await WorkHistory.fetchAllByUserId(userId);
            if (workHistory) {
                return res.status(200).json({
                    message: "Work history fetched successfully...!",
                    "items": workHistory,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Work history fetching failed...!",
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
        console.log("============== get all workHistory by user id controller error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        });
    }
}
exports.getWorkHistoryById = async(req, res, next) => {
    try {
        let workHistoryId = req.query.workHistoryId;
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
        let workHistory = await WorkHistory.fetchById(workHistoryId);
        if (workHistory) {
            return res.status(200).json({
                message: "Work history fetched successfully...!",
                workHistory,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Work history fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============== get workHistory by user id controller error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        });
    }
}
exports.getDeleteWorkHistory = async(req, res, next) => {
    try {
        let workHistoryId = req.query.workHistoryId;
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
        let workHistory = await WorkHistory.delete(workHistoryId);
        if (workHistory) {
            return res.status(200).json({
                message: "Work history deleted successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Work history deletion failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============== get workHistory delete by user id controller error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        });
    }
}