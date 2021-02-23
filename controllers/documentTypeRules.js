const DocumentTypeRule = require("../models/documentTypeRules");
const UserController = require("./user");
const DocumentType = require("../models/documentTypes");
const Profession = require("../models/profession");
const Specialty = require("../models/specialty");

exports.postDocumentTypeRule = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentType = await DocumentType.fetchById(data.documentTypeId);
            if (documentType) {
                let profession = await Profession.fetchById(data.professionId);

                if (profession) {
                    let specialty = await Specialty.fetchById(data.specialtyId);
                    if (specialty) {
                        let documentTypeRule = await DocumentTypeRule.create(data);
                        if (documentTypeRule.success) {
                            let items = await DocumentTypeRule.fetchAll();
                            return res.status(200).json({
                                message: "Document type rule created successfully...!",
                                items,
                                hasError: false
                            })
                        } else {
                            return res.status(200).json({
                                message: "Document type rule creation failed...!",
                                hasError: true
                            })
                        }
                    } else {
                        return res.status(200).json({
                            message: "Specialty not found...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "Profession not found...!",
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
        console.log("===== document type rule create controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.updateDocumentTypeRule = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentType = await DocumentType.fetchById(data.documentTypeId);
            if (documentType) {
                let profession = await Profession.fetchById(data.professionId);

                if (profession) {
                    let specialty = await Specialty.fetchById(data.specialtyId);
                    if (specialty) {
                        let documentTypeRule = await DocumentTypeRule.update(data);
                        if (documentTypeRule.success) {
                            let items = await DocumentTypeRule.fetchAll();
                            return res.status(200).json({
                                message: "Document type rule updated successfully...!",
                                items,
                                hasError: false
                            })
                        } else {
                            return res.status(200).json({
                                message: "Document type rule updation failed...!",
                                hasError: true
                            })
                        }
                    } else {
                        return res.status(200).json({
                            message: "Specialty not found...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "Profession not found...!",
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
        console.log("===== document type rule update controller error =====", error);
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

exports.deleteDocumentTypeRule = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let documentTypeRuleId = req.query.documentTypeRuleId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let isDelete = await DocumentTypeRule.delete(documentTypeRuleId);
            if (isDelete) {
                let items = await DocumentTypeRule.fetchAll();
                return res.status(200).json({
                    message: "Document type rule deleted successfully...!",
                    items,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document type rule deletion failed...!",
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
        console.log("===== document type rule delete controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getDocumentTypeRuleById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let documentTypeRuleId = req.query.documentTypeRuleId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let documentTypeRule = await DocumentTypeRule.fetchById(documentTypeRuleId);
            if (documentTypeRule) {
                return res.status(200).json({
                    message: "Document type rule fetched successfully...!",
                    documentTypeRule,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document type rule fetching failed...!",
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
        console.log("===== document type rule fetch by id controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getAllDocumentTypeRules = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await DocumentTypeRule.fetchAll();
            if (items) {
                return res.status(200).json({
                    message: "Document type rules fetched successfully...!",
                    items,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document type rules fetching failed...!",
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
        console.log("===== document type rules fetch all controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}
exports.getAllDocumentTypeRulesByDocumentType = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await DocumentTypeRule.fetchAllByDocumentType(req.query.documentTypeId);
            if (items) {
                return res.status(200).json({
                    message: "Document type rules fetched successfully...!",
                    items,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Document type rules fetching failed...!",
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
        console.log("===== document type rules by document type fetch all controller error =====", error);
        return res.status(200).json({
            message: "Some error occurred. Please try later...!",
            hasError: true
        })
    }
}