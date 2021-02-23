const Audits = require("../models/audit");
const UserController = require("./user");
exports.postAudits = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let audit = await Audits.create(data);
            if (audit.success) {
                return res.status(200).json({
                    message: "Audit created successfully...!",
                    "audit": audit.audit,
                    hasError: false
                });
            } else {
                return res.status(200).json({
                    message: "Audit creation failed...!",
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
        console.log("===== Audit creation error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.postUpdateAudit = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let audit = await Audits.update(data);
            if (audit.success) {
                return res.status(200).json({
                    message: "Audit updated successfully...!",
                    "audit": audit.audit,
                    hasError: false
                });
            } else {
                return res.status(200).json({
                    message: "Audit updation failed...!",
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
        console.log("===== Audit updation error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.deleteAudit = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let auditId = req.query.auditId;
            let isDelete = await Audits.delete(auditId);
            if (isDelete) {
                let audits = await Audits.fetchAll();
                return res.status(200).json({
                    message: "Audit deleted successfully...!",
                    "items": audits,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Audit deletion failed...!",
                    hasError: true
                })
            }
        }

    } catch (error) {
        console.log("===== Audit deletion error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getAllAudits = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let audits = await Audits.fetchAll(req.query);
            return res.status(200).json({
                message: "Document Audits fetched successfully...!",
                "items": audits,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Wrong admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== Audit get all error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getAuditById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let audit = await Audits.fetchById(req.query.auditId);
            if (audit) {
                return res.status(200).json({
                    message: "Audit found...!",
                    audit,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Audit not found...!",
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
        console.log("===== Audit get by id error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}