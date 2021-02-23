const EmployerDocTypes = require("../models/employerDocTypes");
const UserController = require("./user");


exports.postEmployerDocType = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerDocTypes.create(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer doctype created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer doctype creation failed...!",
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
        console.log("============ post employers  DocTypes controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateEmployerDocType = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerDocTypes.update(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer doctype updated successfully...!",
                    "doctype": employer.doctype,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer doctype updation failed...!",
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
        console.log("============ post update employers DocTypes controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteEmployerDocType = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let isDelete = await EmployerDocTypes.delete(data.employerDocTypeId);
            if (isDelete) {
                let items = await EmployerDocTypes.fetchAllByEmployerId(data.employerId);
                return res.status(200).json({
                    message: "Employer doctype deleted successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer doctype deletion failed...!",
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
        console.log("============ get delete employers DocTypes controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerDocTypeById = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let doctype = await EmployerDocTypes.fetchByEmployerId(data.employerDocTypeId, data.employerId);
            if (doctype) {
                return res.status(200).json({
                    message: "Employer doctype found successfully...!",
                    hasError: false,
                    doctype
                })
            } else {
                return res.status(200).json({
                    message: "Employer doctype not found...!",
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
        console.log("============ get employers DocTypes by id controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerDocTypes = async(req, res, next) => {
    try {
        let data = req.query;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await EmployerDocTypes.fetchAllByEmployerId(data.employerId);
            if (items) {
                return res.status(200).json({
                    message: "Employer DocTypes fetched successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer DocTypes fetching failed...!",
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
        console.log("============ get all employers DocTypes controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}