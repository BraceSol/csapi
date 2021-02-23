const ActivityLog = require("../models/activityLog");
const UserController = require("./user");

exports.getActivityLogByEntityId = async(req, res, next) => {
    try {
        let entityId = req.query.entityId;
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
        let activityLogs = await ActivityLog.fetchAllByEntity(entityId);
        return res.status(200).json({
            message: "Activity Logs fetched successfully...!",
            "items": activityLogs ? activityLogs : [],
            hasError: false
        })
    } catch (error) {
        console.log("====== Activity Logs fetch all by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.postActivityLog = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let activitylog = await ActivityLog.create(data);
            if (activitylog.success) {
                return res.status(200).json({
                    message: "Activity Log created successfully...!",
                    "activitylog": activitylog.activitylog,
                    hasError: false
                });
            } else {
                return res.status(200).json({
                    message: "Activity Log creation failed...!",
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
        console.log("===== Activity Log creation error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}