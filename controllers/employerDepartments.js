const EmployerDepartments = require("../models/employerDepartments");
const UserController = require("./user");


exports.postEmployerDepartment = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerDepartments.create(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer department created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer department creation failed...!",
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
        console.log("============ post employers  Departments controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateEmployerDepartment = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerDepartments.update(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer department updated successfully...!",
                    "department": employer.department,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer department updation failed...!",
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
        console.log("============ post update employers Departments controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteEmployerDepartment = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let isDelete = await EmployerDepartments.delete(data.employerDepartmentId);
            if (isDelete) {
                let items = await EmployerDepartments.fetchAllByEmployerId(data.employerId);
                return res.status(200).json({
                    message: "Employer department deleted successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer department deletion failed...!",
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
        console.log("============ get delete employers Departments controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerDepartmentById = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let department = await EmployerDepartments.fetchByEmployerId(data.employerDepartmentId, data.employerId);
            if (department) {
                return res.status(200).json({
                    message: "Employer department found successfully...!",
                    hasError: false,
                    department
                })
            } else {
                return res.status(200).json({
                    message: "Employer department not found...!",
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
        console.log("============ get employers Departments by id controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerDepartments = async(req, res, next) => {
    try {
        let data = req.query;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await EmployerDepartments.fetchAllByEmployerId(data.employerId);
            if (items) {
                return res.status(200).json({
                    message: "Employer Departments fetched successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer Departments fetching failed...!",
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
        console.log("============ get all employers Departments controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}