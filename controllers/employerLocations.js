const EmployerLocations = require("../models/employerLocations");
const UserController = require("./user");


exports.postEmployerLocation = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerLocations.create(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer location created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer location creation failed...!",
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
        console.log("============ post employers  Locations controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateEmployerLocation = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerLocations.update(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer location updated successfully...!",
                    "location": employer.location,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer location updation failed...!",
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
        console.log("============ post update employers Locations controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteEmployerLocation = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let isDelete = await EmployerLocations.delete(data.employerLocationId);
            if (isDelete) {
                let items = await EmployerLocations.fetchAllByEmployerId(data.employerId);
                return res.status(200).json({
                    message: "Employer location deleted successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer location deletion failed...!",
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
        console.log("============ get delete employers Locations controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerLocationById = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let location = await EmployerLocations.fetchByEmployerId(data.employerLocationId, data.employerId);
            if (location) {
                return res.status(200).json({
                    message: "Employer location found successfully...!",
                    hasError: false,
                    location
                })
            } else {
                return res.status(200).json({
                    message: "Employer location not found...!",
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
        console.log("============ get employers Locations by id controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerLocations = async(req, res, next) => {
    try {
        let data = req.query;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await EmployerLocations.fetchAllByEmployerId(data.employerId);
            if (items) {
                return res.status(200).json({
                    message: "Employer Locations fetched successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer Locations fetching failed...!",
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
        console.log("============ get all employers Locations controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}