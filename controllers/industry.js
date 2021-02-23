const Industry = require("../models/industry");
const UserController = require("./user")

exports.getIndustries = async(req, res, next) => {
    try {
        let industries = await Industry.fetchAll();
        if (industries) {
            return res.status(200).json({
                message: "Industries fetched successfully...!",
                "items": industries,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Industries fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("============== fetch all industries controller error ==================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postIndustries = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let industry = await Industry.create(data);
            if (industry.success) {
                let industries = await Industry.fetchAll();
                return res.status(200).json({
                    message: "Industry created successfully",
                    "items": industries,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Industry creation failed...!",
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
        console.log("============== create industries controller error ====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateIndustry = async(req, res, next) => {
    try {
        let data = req.body;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let industry = await Industry.update(data);
            if (industry.success) {
                let industries = await Industry.fetchAll();
                return res.status(200).json({
                    message: "Industry updated successfully",
                    "items": industries,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Industry updation failed...!",
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
        console.log("============== update industries controller error ====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getIndustryById = async(req, res, next) => {
    try {
        let industryId = req.query.industryId;
        let industry = await Industry.fetchById(industryId);
        let isAdmin = await UserController.isAdminUser(req.query.adminId);
        if (isAdmin) {
            if (industry) {
                return res.status(200).json({
                    message: "Industry found successfully...!",
                    industry,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Industry not found please try later...!",
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
        console.log('================ Industry get by id error ================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getDeleteIndustry = async(req, res, next) => {
    try {
        let industryId = req.query.industryId;
        let isAdmin = await UserController.isAdminUser(req.query.adminId);
        if (isAdmin) {
            let isDeleted = await Industry.delete(industryId);
            if (isDeleted) {
                let items = await Industry.fetchAll();
                return res.status(200).json({
                    message: "Industry found successfully...!",
                    items,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Industry not found please try later...!",
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
        console.log('================ Industry get by id error ================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}