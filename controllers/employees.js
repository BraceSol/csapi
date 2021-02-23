const Employees = require("../models/employees");
const UserController = require("./user");
const User = require("../models/user");
const Profession2specialty = require("../models/profession2specialty");

exports.postEmployerEmployee = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            if (data.professionId) {
                let specialtyIds = [];
                let specialties = await Profession2specialty.fetchAllByProfessionId(data.professionId);
                for (let index = 0; index < specialties.length; index++) {
                    let element = specialties[index];
                    if (element) {
                        specialtyIds.push(element.specialtyId);
                    }
                }
                data = JSON.parse(JSON.stringify(data));
                data.specialtyIds = JSON.stringify(specialtyIds);
                data.fullName = data.firstName + " " + data.lastName;
                let user = await User.create(data);
                if (user.success) {
                    data.userId = user.user.id;
                    let employee = await Employees.create(data);
                    if (employee.success) {
                        return res.status(200).json({
                            message: "Employer employee created successfully...!",
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "Employer employee creation failed...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "Employer employee creation failed. User not created...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Employer employee creation failed. Profession not found...!",
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
        console.log("============ post employers  Employees controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postUpdateEmployerEmployee = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            if (data.professionId) {
                let specialtyIds = [];
                let specialties = await Profession2specialty.fetchAllByProfessionId(data.professionId);
                for (let index = 0; index < specialties.length; index++) {
                    let element = specialties[index];
                    if (element) {
                        specialtyIds.push(element.specialtyId);
                    }
                }
                data = JSON.parse(JSON.stringify(data));
                data.specialtyIds = JSON.stringify(specialtyIds);
                data.fullName = data.firstName + " " + data.lastName;
                let user = await User.update(data);
                if (user.success) {
                    data.userId = user.user.id;
                    let employee = await Employees.update(data);
                    if (employee.success) {
                        return res.status(200).json({
                            message: "Employer employee updated successfully...!",
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "Employer employee updation failed...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "Employer employee updation failed. User not updated...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Employer employee updation failed. Profession not found...!",
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
        console.log("============ post update employers Employees controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteEmployerEmployee = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let isDelete = await Employees.delete(data.employerEmployeeId);
            if (isDelete) {
                let items = await Employees.fetchAllByEmployerId(data.employerId);
                return res.status(200).json({
                    message: "Employer employee deleted successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer employee deletion failed...!",
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
        console.log("============ get delete employers Employees controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerEmployeeById = async(req, res, next) => {
    try {
        let data = req.query;
        let isAdmin = await UserController.isAdminUser(data.adminId);
        if (isAdmin) {
            let employee = await Employees.fetchByEmployerId(data.employerEmployeeId, data.employerId);
            if (employee) {
                return res.status(200).json({
                    message: "Employer employee found successfully...!",
                    hasError: false,
                    employee
                })
            } else {
                return res.status(200).json({
                    message: "Employer employee not found...!",
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
        console.log("============ get employers Employees by id controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getEmployerEmployees = async(req, res, next) => {
    try {
        let data = req.query;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let items = await Employees.fetchAllByEmployerId(data.employerId);
            if (items) {
                return res.status(200).json({
                    message: "Employer Employees fetched successfully...!",
                    hasError: false,
                    items
                })
            } else {
                return res.status(200).json({
                    message: "Employer Employees fetching failed...!",
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
        console.log("============ get all employers Employees controller error=========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}