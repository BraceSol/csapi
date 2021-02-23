const EmployerContracts = require("../models/employerContracts");
const UserController = require("./user");


exports.postEmployerContract = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerContracts.create(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer contract created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer contract creation failed...!",
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
        console.log("============ post employers  contracts controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateEmployerContract = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let employer = await EmployerContracts.update(data);
            if (employer.success) {
                return res.status(200).json({
                    message: "Employer contract updated successfully...!",
                    "contract": employer.contract,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Employer contract updation failed...!",
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
        console.log("============ post update employers contracts controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteEmployerContract = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let isDelete = await EmployerContracts.delete(data.employerContractId);
            if (isDelete) {
                let items = await EmployerContracts.fetchAllByEmployerId(data.employerId);
                return res.status(200).json({
                    message: "Employer contract deleted successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer contract deletion failed...!",
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
        console.log("============ get delete employers contracts controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerContractById = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let contract = await EmployerContracts.fetchById(data.employerContractId);
            if (employer) {
                return res.status(200).json({
                    message: "Employer contract found successfully...!",
                    hasError: false,
                    contract
                })
            } else {
                return res.status(200).json({
                    message: "Employer contract not found...!",
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
        console.log("============ get employers contracts by id controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerContracts = async(req, res, next) => {
    try {
        let data = req.query;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await EmployerContracts.fetchAllByEmployerId(data.employerId);
            if (items) {
                return res.status(200).json({
                    message: "Employer contracts fetched successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer contracts fetching failed...!",
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
        console.log("============ get all employers contracts controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}