const EmployerDocTypeRules = require("../models/employerDocTypeRules");
const UserController = require("./user");


exports.postEmployerDocTypeRule = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerDocTypeRules.create(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer doctype rule created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer doctype rule creation failed...!",
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
        console.log("============ post employers  DocTypes rule controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateEmployerDocTypeRule = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerDocTypeRules.update(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer doctype rule updated successfully...!",
                    "doctype": employer.doctypeRule,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer doctype rule updation failed...!",
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
        console.log("============ post update employers DocTypes rule controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteEmployerDocTypeRule = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let isDelete = await EmployerDocTypeRules.delete(data.employerDocTypeRuleId, data.employerDocTypeId);
            if (isDelete) {
                let items = await EmployerDocTypeRules.fetchAllByEmployerIdAndDocumentTypeId(data.employerDocTypeRuleId, data.employerDocTypeId);
                return res.status(200).json({
                    message: "Employer doctype rule deleted successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer doctype rule deletion failed...!",
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
        console.log("============ get delete employers DocTypes rule controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerDocTypeRuleById = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let docTypeRule = await EmployerDocTypeRules.fetchById(data.employerDocTypeId, data.employerDocTypeRuleId);
            if (docTypeRule) {
                return res.status(200).json({
                    message: "Employer doctype found successfully...!",
                    hasError: false,
                    docTypeRule
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
exports.getEmployerDocTypeRules = async(req, res, next) => {
    try {
        let data = req.query;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await EmployerDocTypeRules.fetchAllByEmployerIdAndDocumentTypeId(data.employerId, data.employerDocTypeId);
            if (items) {
                return res.status(200).json({
                    message: "Employer DocTypeRules fetched successfully...!",
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