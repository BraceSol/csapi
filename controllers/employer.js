const Employer = require("../models/employer");
const UserController = require("./user");


exports.postEmployer = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await Employer.create(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer creation failed...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrong user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============ post employers controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateEmployer = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await Employer.update(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer updated successfully...!",
                    "employer": employer.employer,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer updation failed...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrong user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============ post update employers controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteEmployer = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let isDelete = await Employer.delete(data.employerId);
            if (isDelete) {
                let items = await Employer.fethcAll();
                return res.status(200).json({
                    message: "Employer deleted successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer deletion failed...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrong user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============ get delete employers controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerById = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let employer = await Employer.fetchById(data.employerId);
            if (employer) {
                return res.status(200).json({
                    message: "Employer found successfully...!",
                    hasError: false,
                    employer
                })
            } else {
                return res.status(200).json({
                    message: "Employer not found...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrong user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============ get employers by id controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployers = async(req, res, next) => {
    try {
        let data = req.query;
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
        let items = await Employer.fethcAll();
        if (items) {
            return res.status(200).json({
                message: "Employers fetched successfully...!",
                hasError: false,
                items
            })
        } else {
            return res.status(200).json({
                message: "Employers fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============ get all employers controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}