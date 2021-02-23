const DocumentType = require("../models/documentTypes");
const UserController = require("./user");

exports.postDocumentTypes = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let documentType = await DocumentType.create(data);
            if (documentType.success) {
                let items = documentType.newDocType; //await DocumentType.fetchAll();
                return res.status(200).json({
                    message: "Document type created successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Document type creation failed...!",
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
        console.log("===== document type create controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateDocumentType = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let documentType = await DocumentType.update(data);
            if (documentType.success) {
                let items = await DocumentType.fetchAll();
                return res.status(200).json({
                    message: "Document type updated successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Document type updation failed...!",
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
        console.log("===== document type update controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}

exports.getDeleteDocumentType = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentTypeId = req.query.documentTypeId;
            let isDelete = await DocumentType.delete(documentTypeId);
            if (isDelete) {
                let items = await DocumentType.fetchAll();
                return res.status(200).json({
                    message: "Document type deleted successfully...!",
                    items,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document types deletion failed...!",
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
        console.log("===== document type delete controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}

exports.getAllDocumentTypes = async(req, res, next) => {
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
        let items = await DocumentType.fetchAll();
        if (items) {
            return res.status(200).json({
                message: "Document types fetched successfully...!",
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Document types fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== document type get all controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}

exports.getUnusedEmployerDocuments = async(req, res, next) => {
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
        let items = await DocumentType.fetchAllUnusedEmployerDocs();
        if (items) {
            return res.status(200).json({
                message: "Document types fetched successfully...!",
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Document types fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== document type get all controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getAllDocumentTypesByCategoryId = async(req, res, next) => {
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
        let items = await DocumentType.fetchAllByCategoryId(req.query.documentCategoryId);
        if (items) {
            return res.status(200).json({
                message: "Document types fetched successfully...!",
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Document types fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== document type get all controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getDocumentTypeById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentTypeId = req.query.documentTypeId;
            let documentType = await DocumentType.fetchById(documentTypeId);
            if (documentType) {
                return res.status(200).json({
                    message: "Document type fetched successfully...!",
                    documentType,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document types fetching failed...!",
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
        console.log("===== document type get by id controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getExampleDocumentsById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentTypeId = req.query.documentTypeId;
            let documentType = await DocumentType.fetchExampleDocumentsById(documentTypeId);
            if (documentType) {
                return res.status(200).json({
                    message: "references documents fetched successfully...!",
                    "items": documentType.exampleDocuments ? documentType.exampleDocuments : [],
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Example documents fetching failed...!",
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
        console.log("=====Example document  get by id controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getDocumentReferencesById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentTypeId = req.query.documentTypeId;
            let documentType = await DocumentType.fetchReferencesById(documentTypeId);
            if (documentType) {
                return res.status(200).json({
                    message: "Document references fetched successfully...!",
                    "items": documentType.references ? documentType.references : [],
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document references fetching failed...!",
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
        console.log("===== document references get by id controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}