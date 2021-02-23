const DocumentTypeAttribute = require("../models/documentTypeAttributes");
const { User } = require("../models/user");
const UserController = require("./user");
const DocumentType = require("../models/documentTypes");
exports.postDocumentTypeAttribute = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentType = await DocumentType.fetchById(data.documentTypeId);
            if (documentType) {
                let documentTypeAttribute = await DocumentTypeAttribute.create(data);
                if (documentTypeAttribute.success) {
                    let items = documentTypeAttribute.documentTypeAttributes;
                    return res.status(200).json({
                        message: "Document type attribute created successfully...!",
                        items,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Document type attribute creation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Document type not found...!",
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
        console.log("===== document type attribute create controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateDocumentTypeAttribute = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentType = await DocumentType.fetchById(data.documentTypeId);
            if (documentType) {
                let documentTypeAttribute = await DocumentTypeAttribute.update(data);
                if (documentTypeAttribute.success) {
                    let items = await DocumentTypeAttribute.fetchAll();
                    return res.status(200).json({
                        message: "Document type attribute created successfully...!",
                        items,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Document type attribute creation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Document type not found...!",
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
        console.log("===== document type attribute update controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}

exports.deleteDocumentTypeAttribute = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let documentTypeAttributeId = req.query.documentTypeAttributeId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let isDelete = await DocumentTypeAttribute.delete(documentTypeAttributeId);
            if (isDelete) {
                let items = await DocumentTypeAttribute.fetchAll();
                return res.status(200).json({
                    message: "Document type attribute deleted successfully...!",
                    items,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document type attribute deletion failed...!",
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
        console.log("===== document type attribute delete controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getDocumentTypeAttributeById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let documentTypeAttributeId = req.query.documentTypeAttributeId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentTypeAttribute = await DocumentTypeAttribute.fetchById(documentTypeAttributeId);
            if (documentTypeAttribute) {
                return res.status(200).json({
                    message: "Document type attribute fetched successfully...!",
                    documentTypeAttribute,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document type attribute fetching failed...!",
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
        console.log("===== document type attribute fetch by id controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getAllDocumentTypeAttributes = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await DocumentTypeAttribute.fetchAll();
            return res.status(200).json({
                message: "Document type attributes fetched successfully...!",
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Wrong admin user. Invalid request...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== document type attribute fetch all controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getAllDocumentTypeAttributesByTypeId = async(req, res, next) => {
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
        let items = await DocumentTypeAttribute.fetchAllByDocumentTypeId(req.query.documentTypeId);
        return res.status(200).json({
            message: "Document type attributes fetched successfully...!",
            items,
            hasError: false
        })
    } catch (error) {
        console.log("===== document type attribute fetch all controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}