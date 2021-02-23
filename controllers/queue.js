const Queues = require("../models/queue");
const UserController = require("./user");
const Helper = require("../_helpers/helper");
const Upload = require("../models/uploads");
const Document = require("../models/documents");
exports.postQueues = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let queue = await Queues.create(data);
            if (queue.success) {
                return res.status(200).json({
                    message: "Queue created successfully...!",
                    "queue": queue.queue,
                    hasError: false
                });
            } else {
                return res.status(200).json({
                    message: "Queue creation failed...!",
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
        console.log("===== Queue creation error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.postUpdateQueue = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let queue = await Queues.update(data);
            if (queue.success) {
                return res.status(200).json({
                    message: "Queue updated successfully...!",
                    "queue": queue.queue,
                    hasError: false
                });
            } else {
                return res.status(200).json({
                    message: "Queue updation failed...!",
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
        console.log("===== Queue updation error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.deleteQueue = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let queueId = req.query.queueId;
            let isDelete = await Queues.delete(queueId);
            if (isDelete) {
                let queues = await Queues.fetchAll(data);
                return res.status(200).json({
                    message: "Queue deleted successfully...!",
                    "items": queues,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Queue deletion failed...!",
                    hasError: true
                })
            }
        }

    } catch (error) {
        console.log("===== Queue deletion error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getAllQueues = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let queues = await Queues.fetchAll(req.query);
            return res.status(200).json({
                message: "Document Queues fetched successfully...!",
                "items": queues,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Wrong admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== Queue get all error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getQueueById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let queue = await Queues.fetchById(req.query.queueId);
            if (queue) {
                return res.status(200).json({
                    message: "Queue found...!",
                    queue,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Queue not found...!",
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
        console.log("===== Queue get by id error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.changeQueueStatus = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                });
            }
        }
        let statuses = await Helper.documentStatuses();
        let queueStatus = data.queueStatus;
        // for (let i = 0; i < data.queues.length; i++) {
        // let queueElement = data.queues[i];
        let queue = await Queues.fetchById(data.queueId);
        // isRelatedTo;
        if (queue) {
            data = JSON.parse(JSON.stringify(data));
            data.queueId = queue.id;
            let updatedQueue = await Queues.updateQueueStatus(data);
            if (queueStatus === statuses.accept) {
                data = JSON.parse(JSON.stringify(data));
                let upload = await Upload.fetchByQueueId(queue.id);
                if (upload) {
                    data.storePath = upload.storePath;
                    let document = await Document.create(data);
                    data.isSystem = false;
                    if (updatedQueue.success) {
                        if (document.success) {
                            return res.status(200).json({
                                message: "Status changed and document created successfully...!",
                                hasError: false
                            })

                        } else {
                            return res.status(200).json({
                                message: "Status accepted but document creation failed...!",
                                hasError: true
                            })
                        }
                    } else {
                        return res.status(200).json({
                            message: "Status changing of queue failed...!",
                            hasError: true
                        })
                    }

                } else {
                    return res.status(200).json({
                        message: "Upload related to queue not found...!",
                        hasError: true
                    })
                }
            } else {
                if (updatedQueue.success) {
                    return res.status(200).json({
                        message: "Status changed successfully...!",
                        hasError: true
                    })
                } else {
                    return res.status(200).json({
                        message: "Status changing of queue failed...!",
                        hasError: true
                    })
                }
            }
        } else {
            return res.status(200).json({
                message: "Queue not found...!",
                hasError: true
            })
        }
        // }

    } catch (error) {

    }
}