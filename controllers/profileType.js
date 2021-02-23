const ProfileType = require('../models/profileType');

//============= Profile Type Apis=====================

//getProfileTypes
exports.getProfileTypes = async(req,res,next)=> {
    try{
        let profileTypes = await ProfileType.fetchAll(req.query);
        if(profileTypes) {
            return res.status(200).json({
                message: "Profile types fetched successfully...!",
                profileTypes,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Profile types fetched failed....!",
                hasError: true
            })
        }
    } catch(error) {
        console.log('============= get profile types error ===============',error);
        return res.status(200).json({
            message: "Some error occurred please try later....!",
            hasError: true
        })
    }
}

//updateProfileTypes
exports.postUpdateProfileTypes = async(req,res,next)=> {
    try{
        const data = req.body;
        if(data) {
            let update = await ProfileType.update(data);
            if(update.success) {
                let profileTypes = await ProfileType.fetchAll();
                return res.status(200).json({
                    message: "Update successfull...!",
                    profileTypes,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Update failed...!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Fields are missing...!",
                hasError: true
            })
        }
    } catch(error) {
        console.log('============= update profile types error ===============',error);
        return res.status(200).json({
            message: "Some error occurred please try later....!",
            hasError: true
        })
    }
}
//removeProfileType
exports.getRemoveProfileType = async(req,res,next)=> {
    try{
        const id = req.query.id;
        if(id) {
            let isDelete = await ProfileType.delete(id);
            if(isDelete) {
                let profileTypes = await ProfileType.fetchAll();
                return res.status(200).json({
                    message: "Profile type deleted successfully...!",
                    profileTypes,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Profile type deletion failed....!",
                    hasError: true
                })
            }
        } else {
            return res.status(200).json({
                message: "Id is required...!",
                hasError: true
            })
        }
    } catch(error) {
        console.log('================= remove profile type error===============',error);
        return res.status(200).json({
            message: "Some error occurred please try later....!",
            hasError: true
        })        
    }
}
//createProfileType
exports.postProfileType = async(req,res,next)=> {
    try{
        const data = req.body;
        let profileType = await ProfileType.create(data);
        if(profileType.success) {
            let profileTypes = await ProfileType.fetchAll();
            return res.status(200).json({
                message: "Profile type created successfully...!",
                profileTypes,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Profile type creation failed...!",
                hasError: true
            })
        }
    } catch(error) {
        return res.status(200).json({
            message: "Some error occurred please try later....!",
            hasError: true
        })
    }
}