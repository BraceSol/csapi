const Industry = require("../models/industry");
const DocumentCategories = require("../models/documentCategories");
const UserController = require("./user");
exports.postDocumentCategories = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let industry = await Industry.fetchById(data.industryId);
            if (industry) {
                let documentCategory = await DocumentCategories.create(data);
                if (documentCategory.success) {
                    return res.status(200).json({
                        message: "Document category created successfully...!",
                        "documentCategory": documentCategory.documentCategory,
                        hasError: false
                    });
                } else {
                    return res.status(200).json({
                        message: "Document category creation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Industry not found...!",
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
        console.log("===== Document Category creation error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.postUpdateDocumentCategory = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let industry = await Industry.fetchById(data.industryId);
            if (industry) {
                let update = await DocumentCategories.update(data);
                if (update.success) {
                    return res.status(200).json({
                        message: "Document category updated successfully...!",
                        "documentCategory": update.documentCategory,
                        hasError: false
                    });
                } else {
                    return res.status(200).json({
                        message: "Document category updation failed...!",
                        hasError: true
                    });
                }
            } else {
                return res.status(200).json({
                    message: "Industry not found...!",
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
        console.log("===== Document Category updation error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.deleteDocumentCategory = async(req, res, next) => {
    try {
        let documentCategoryId = req.query.documentCategoryId;
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let isDelete = await DocumentCategories.delete(documentCategoryId);
            if (isDelete) {
                let documentCategories = await DocumentCategories.fetchAll();
                return res.status(200).json({
                    message: "Document category deleted successfully...!",
                    "items": documentCategories,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document category deletion failed...!",
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
        console.log("===== Document Category deletion error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getAllCategories = async(req, res, next) => {
    try {
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
        let documentCategories = await DocumentCategories.fetchAll();
        return res.status(200).json({
            message: "Document categories fetched successfully...!",
            "items": documentCategories,
            hasError: false
        })
    } catch (error) {
        console.log("===== Document Category get all error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getByDocumentCategoryId = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        console.log("adminId", adminId);

        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }

        let documentCategory = await DocumentCategories.fetchById(req.query.documentCategoryId);
        if (documentCategory) {
            return res.status(200).json({
                message: "Document category found...!",
                documentCategory,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Document category not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== Document Category get by id error =====", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}