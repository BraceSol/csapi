const Jobs = require("../models/jobs");
const User = require("../models/user");
const UserController = require("./user");
exports.postJobs = async(req, res, next) => {
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
        let job = await Jobs.create(data);
        if (job.success) {
            return res.status(200).json({
                message: "Licence created successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Jobs creation failed...!"
            })
        }
    } catch (error) {
        console.log("================ post Jobs error ============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.updateJob = async(req, res, next) => {
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
        let job = await Jobs.update(data);
        if (job.success) {
            return res.status(200).json({
                message: "Licence created successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Jobs creation failed...!"
            })
        }
    } catch (error) {
        console.log("================ post Jobs update error ============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getJobsByEmployerId = async(req, res, next) => {
    try {
        let employerId = req.query.employerId;
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
        let jobs = await Jobs.fetchAllByEmployerId(employerId);
        if (jobs) {
            return res.status(200).json({
                message: "Jobs fetched successfully...!",
                "items": jobs,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Jobs fetching failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== Jobs fetch all by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getJobById = async(req, res, next) => {
    try {
        let jobId = req.query.jobId;
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
        let job = await Jobs.fetchById(jobId);
        if (job) {
            return res.status(200).json({
                message: "Jobs fetched successfully...!",
                job,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Jobs fetching failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== Jobs fetch by Jobs id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteJob = async(req, res, next) => {
    try {
        let jobId = req.query.jobId;
        let employerId = req.query.employerId;
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
        let isDelete = await Jobs.delete(jobId, employerId);
        if (isDelete) {
            return res.status(200).json({
                message: "Jobs deleted successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Jobs deleting failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== Jobs fetch by Jobs id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}