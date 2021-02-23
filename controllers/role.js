const Role = require('../models/role');
const User = require("../controllers/user");
//============= Role Apis ==============
//getRoles
exports.getRoles = async(req, res, next) => {
        try {
            let roles = await Role.fetchAll();
            const adminId = req.query.adminId;
            let isAdmin = await User.isAdminUser(adminId);
            if (isAdmin) {
                if (roles) {
                    return res.status(200).json({
                        message: "Roles fetched successfully...!",
                        "items": roles,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Roles fetching failed...!",
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
            console.log('=============== get roles error =================', error);
            return res.status(200).json({
                message: "Some error occurred please try later...!",
                hasError: true
            })
        }
    }
    //updateRoles
exports.postUpdateRoles = async(req, res, next) => {
        try {
            let data = req.body;
            const adminId = data.adminId;
            let isAdmin = await User.isAdminUser(adminId);
            if (isAdmin) {
                if (data) {
                    let isUpdate = await Role.update(data);
                    if (isUpdate.success) {
                        let roles = await Role.fetchAll();
                        return res.status(200).json({
                            message: "Role updated successfully...!",
                            "items": roles,
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "Role updation failed...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "Required fields are missing...!",
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
            console.log('================ update roles error ================', error);
            return res.status(200).json({
                message: "Some error occurred please try later...!",
                hasError: true
            })
        }
    }
    //removeRole
exports.getRemoveRole = async(req, res, next) => {
        try {
            const roleId = req.query.roleId;
            const adminId = req.query.adminId;
            let isAdmin = await User.isAdminUser(adminId);
            if (isAdmin) {
                if (roleId) {
                    let isRemoved = await Role.delete(roleId);
                    if (isRemoved) {
                        let roles = await Role.fetchAll();
                        return res.status(200).json({
                            message: "Role deleted successfully...!",
                            "items": roles,
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "Role deletion failed...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "Required fields are missing...!",
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
            console.log('================ remove roles error ================', error);
            return res.status(200).json({
                message: "Some error occurred please try later...!",
                hasError: true
            })
        }
    }
    //createRole
exports.postRole = async(req, res, next) => {
    try {
        let data = req.body;
        const adminId = data.adminId;
        let isAdmin = await User.isAdminUser(adminId);
        if (isAdmin) {
            if (data) {
                let role = await Role.create(data);
                if (role.success) {
                    let roles = await Role.fetchAll();
                    return res.status(200).json({
                        message: "Role created successfully...!",
                        "items": roles,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Role creation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Required fields are missing...!",
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
        console.log('================ create roles error ================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getRoleById = async(req, res, next) => {
    try {
        let roleId = req.query.roleId;
        let role = await Role.fetchById(roleId);
        const adminId = req.query.adminId;
        let isAdmin = await User.isAdminUser(adminId);
        if (isAdmin) {
            if (role) {
                return res.status(200).json({
                    message: "Role found successfully...!",
                    role,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Role not found please try later...!",
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
        console.log('================ Role get by id roles error ================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}