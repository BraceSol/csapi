const Permission = require('../models/permission');
const { User } = require('../models/user');
const PermissionService = require('../services/permission')
const UserController = require("./user")
    //========= Permission Api's =======================
    //getAllPermissions
exports.getAllPermissions = async(req, res, next) => {
    try {
        let result = await Permission.fetchAll();
        if (result) {
            return res.status(200).json({
                "items": result,
                message: "Permissions fetched successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                "items": result,
                message: "Permissions fetched failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log('==============get all permission error ===============', error)
        return res.status(200).json({
            "items": [],
            message: "Permissions fetched failed...!",
            hasError: true
        })
    }
}

//getPermissionByName
exports.getPermissionByName = async(req, res, next) => {
        try {
            let permission = req.param.permission;
            if (permission) {
                let isValid = PermissionService.validateModel(permission);
                if (isValid) {
                    let result = await Permission.fetchByName(permission);
                    if (result) {
                        return res.status(200).json({
                            message: "Permission found successfully...!",
                            "permission": result,
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "Permission not found...!",
                            "permission": result,
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "Permission name can be only string...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Permission cannot be empty...!",
                    "permission": {},
                    hasError: true
                })
            }
        } catch (error) {
            console.log('==============getPermissionByNameError===================', error)
            return res.status(200).json({
                message: "Permission fetch failed...!",
                "permission": {},
                hasError: true
            })
        }
    }
    //getPermissionById
exports.getPermissionById = async(req, res, next) => {
        try {
            let id = req.query.permissionId;
            if (id) {
                let result = await Permission.fetchById(id);
                if (result) {
                    return res.status(200).json({
                        message: "Permission found successfully...!",
                        "permission": result,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Permission not found...!",
                        "permission": result,
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Id cannot be empty...!",
                    "permission": {},
                    hasError: true
                })
            }
        } catch (error) {
            console.log('==============getPermissionByIdError===================', error)
            return res.status(200).json({
                message: "Permission fetch failed...!",
                "permission": {},
                hasError: true
            })
        }
    }
    //postUpdatePermissioon
exports.postUpdatePermission = async(req, res, next) => {
        try {
            let data = req.body;
            if (data) {
                let isValid = PermissionService.validateModel(data.name);
                if (isValid || true) {
                    let result = await Permission.update(data);
                    if (result.success) {
                        let permissions = await Permission.fetchAll();
                        return res.status(200).json({
                            message: "Permission updated successfully...!",
                            "items": permissions,
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "Permission updation failed...!",
                            hasError: true
                        })
                    }
                } else {
                    return res.status(200).json({
                        message: "Permission name can be only string...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Data cannot be empty...!",
                    hasError: true
                })
            }
        } catch (error) {
            console.log('==============getPermissionByIdError===================', error)
            return res.status(200).json({
                message: "Permission update failed...!",
                hasError: true
            })
        }
    }
    //postCreatePermissioon
exports.postCreatePermission = async(req, res, next) => {
    try {
        let data = req.body;
        if (data) {
            let isValid = PermissionService.validateModel(data.name);
            if (true) {
                let result = await Permission.create(data);
                if (result.success) {
                    return res.status(200).json({
                        message: "Permission created successfully...!",
                        "permission": result.permission,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Permission creation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Permission name can be only string...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Data cannot be empty...!",
                "permission": {},
                hasError: true
            })
        }
    } catch (error) {
        console.log('==============getPermissionByIdError===================', error)
        return res.status(200).json({
            message: "Permission creation failed...!",
            "permission": {},
            hasError: true
        })
    }
}
exports.deletePermission = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let permissionId = req.query.permissionId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let isDeleted = await Permission.delete(permissionId);
            if (isDeleted) {
                let items = await Permission.fetchAll();
                return res.status(200).json({
                    message: "Permission deleted successfully...!",
                    hasError: false,
                    items,
                })
            } else {
                return res.status(200).json({
                    message: "Permission deletion faile...!",
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
        console.log('==============deletePermissionByIdError===================', error)
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}