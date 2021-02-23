const View = require('../models/view');
const User = require("../controllers/user");
//============= View Apis ==============
//getViews
exports.getViews = async(req, res, next) => {
        try {
            let filterData = {};
            if (req.query.searchType) {
                filterData.searchType = req.query.searchType;
            }
            if (req.query.userId) {
                filterData.userId = req.query.userId;
            }
            let views = await View.fetch(filterData);
            if (views) {
                return res.status(200).json({
                    message: "Views fetched successfully...!",
                    "items": views,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Views fetching failed...!",
                    hasError: true
                })
            }
        } catch (error) {
            console.log('=============== get views error =================', error);
            return res.status(200).json({
                message: "Some error occurred please try later...!",
                hasError: true
            })
        }
    }
    //updateViews
exports.postUpdateViews = async(req, res, next) => {
        try {
            let data = req.body;
            if (data) {
                let isUpdate = await View.update(data);
                if (isUpdate.success) {
                    let views = await View.fetchAll();
                    return res.status(200).json({
                        message: "View updated successfully...!",
                        "items": views,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "View updation failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Required fields are missing...!",
                    hasError: true
                })
            }
        } catch (error) {
            console.log('================ update views error ================', error);
            return res.status(200).json({
                message: "Some error occurred please try later...!",
                hasError: true
            })
        }
    }
    //removeView
exports.getRemoveView = async(req, res, next) => {
        try {
            const viewId = req.query.viewId;
            const adminId = req.query.adminId;
            let isAdmin = await User.isAdminUser(adminId);
            if (isAdmin) {
                if (viewId) {
                    let isRemoved = await View.delete(viewId);
                    if (isRemoved) {
                        let views = await View.fetchAll();
                        return res.status(200).json({
                            message: "View deleted successfully...!",
                            "items": views,
                            hasError: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "View deletion failed...!",
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
            console.log('================ remove views error ================', error);
            return res.status(200).json({
                message: "Some error occurred please try later...!",
                hasError: true
            })
        }
    }
    //createView
exports.postView = async(req, res, next) => {
    try {
        let data = req.body;
        if (data) {
            let view = await View.create(data);
            if (view.success) {
                let views = await View.fetchAll();
                return res.status(200).json({
                    message: "View created successfully...!",
                    "items": views,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "View creation failed...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Required fields are missing...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log('================ create views error ================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getViewById = async(req, res, next) => {
    try {
        let viewId = req.query.viewId;
        let view = await View.fetchById(viewId);
        if (view) {
            return res.status(200).json({
                message: "View found successfully...!",
                view,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "View not found please try later...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log('================ View get by id views error ================', error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}