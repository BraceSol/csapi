const Device = require("../models/device");
const UserController = require("./user");

exports.getDevices = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let devices = await Device.fetchAll();
            return res.status(200).json({
                message: "Devices fetched successfully...!",
                hasError: false,
                "items": devices
            })
        } else {
            return res.status(200).json({
                message: "Wrond admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== devices get controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getDevicesByUserId = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let userId = req.query.userId;
            let items = await Device.fetchAllByUserId(userId);
            if (items) {
                return res.status(200).json({
                    message: "Devices fetched successfully...!",
                    hasError: false,
                    items
                });
            } else {
                return res.status(200).json({
                    message: "Devices not found for this user...!",
                    hasError: true
                });
            }
        } else {
            return res.status(200).json({
                message: "Wrond admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== devices get controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let device = await Device.fetchById(req.query.deviceId);
            if (device) {
                return res.status(200).json({
                    message: "Device found successfully...!",
                    hasError: false,
                    device
                })
            } else {
                return res.status(200).json({
                    message: "Device not found...!",
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
        console.log("===== devices get by id controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.updateDevice = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let isUpdate = await Device.update(data);
            if (isUpdate.success) {
                return res.status(200).json({
                    message: "Device updated successfully...!",
                    "device": isUpdate.device,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Device updation failed...!",
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
        console.log("===== devices update controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.removeDevice = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let isDelete = await Device.delete(req.query.deviceId);
            if (isDelete) {
                let devices = await Device.fetchAll();
                return res.status(200).json({
                    messaage: "Device deleted successfully",
                    "items": devices,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Device not found...!",
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
        console.log("===== devices remove controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}