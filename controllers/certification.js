const Certification = require("../models/certification");
const User = require("../models/user");
const UserController = require("./user");

exports.postCertification = async(req, res, next) => {
    try {
        let data = req.body;
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
        let user = await User.fetchById(data.userId);
        if (user) {
            let certificate = await Certification.create(data);
            if (certificate.success) {
                return res.status(200).json({
                    message: "Certification created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Certification creation failed...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "User not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("=========== post certification controller error =============", error);
    }
}
exports.updateCertification = async(req, res, next) => {
    try {
        let data = req.body;
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
        let user = await User.fetchById(data.userId);
        if (user) {
            let certificate = await Certification.update(data);
            if (certificate.success) {
                return res.status(200).json({
                    message: "Certification updated successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Certification updation failed...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "User not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("=========== post update certification controller error =============", error);
    }
}

exports.getCertificationByUserId = async(req, res, next) => {
    try {
        let userId = req.query.userId;
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
        let user = await User.fetchById(userId);
        if (user) {
            let certification = await Certification.fetchAllByUserId(userId);
            if (certification) {
                return res.status(200).json({
                    message: "Certifications fetched successfully...!",
                    "items": certification,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Certifications fetching failed....!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "User not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== certification fetch by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteCertification = async(req, res, next) => {
    try {
        let certificationId = req.query.certificationId;
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
        let certification = await Certification.delete(certificationId);
        if (certification) {
            return res.status(200).json({
                message: "Certification deleted successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Certification deleting failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== certification fetch by  id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getCertificationById = async(req, res, next) => {
    try {
        let userId = req.query.userId;
        let adminId = req.query.adminId;
        let certificationId = req.query.certificationId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let user = await User.fetchById(userId);
        if (user) {
            let certification = await Certification.fetchById(certificationId);
            if (certification) {
                return res.status(200).json({
                    message: "Certification fetched successfully...!",
                    certification,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Certification fetching failed....!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "User not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== certification fetch by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}