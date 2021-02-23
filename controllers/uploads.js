const Queues = require("../models/queue");
const Upload = require("../models/uploads");
const Document = require("../models/documents")
const UserController = require("./user");
const Helper = require("../_helpers/helper");
const fs = require('fs');
exports.upload = async(req, res, next) => {
    try {
        let data = req.query;
        let platform = "";
        console.log("before parse data ==========", data);
        data = JSON.parse(JSON.stringify(data));
        console.log("after parse data ==========");
        data.storePath = res.cloudinaryResult.secure_url;
        data.filename = req.file.originalname;
        let upload = await Upload.create(data);
        let status = await Helper.documentStatuses();
        fs.rmdirSync('files', { recursive: true });
        if (upload.success) {
            data.uploadId = upload.upload.id;
            data.id = upload.upload.id
            data.platform = data.platform.toLowerCase();
            data.statusCode = status.hold;
            let queue = await Queues.create(data);
            if (data.platform === "app" || data.platform === "admin") {
                if (queue.success) {
                    return res.status(200).json({
                        message: "Document uploaded and queue created successfully...!",
                        hasError: false,
                        "upload": upload.upload
                    })
                } else {
                    return res.status(200).json({
                        message: "Document uploading failed...!",
                        hasError: true,
                    })
                }
            } else if (data.platform === "3rdParty") {
                let queue = await Queues.create(data);
                if (queue.sucess) {
                    return res.status(200).json({
                        message: "Document uploaded and queue created successfully...!",
                        "upload": upload.upload,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Queues creation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Not valid platform type...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Upload failed please try later...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== upload controller error ========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.fetchUploads = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user invalid request...!",
                    hasError: true
                })
            }
        }

        let filterData = {};
        if (req.query.queueId) {
            filterData.queueId = req.query.queueId;
        }
        if (req.query.userId) {
            filterData.userId = req.query.userId;
        }
        let items = await Upload.fetchAll(filterData);
        if (items) {
            return res.status(200).json({
                message: "Uploads fetched successfully...!",
                length: items.length,
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Uploads fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== uploads fetch by user id error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.fetchUserDocuments = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user invalid request...!",
                    hasError: true
                })
            }
        }

        let userId = req.query.userId;
        console.log("userID =========", userId);
        let items = await Document.fetchByUserId(userId);
        if (items) {
            return res.status(200).json({
                message: "Documents fetched successfully...!",
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Documents fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== uploads fetch by user id error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}