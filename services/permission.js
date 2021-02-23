const Permission = require('../models/permission');
var validator = require('validator');


exports.validateModel = (permissionData)=> {
    try{
        let success = false;
        if(permissionData && permissionData.length > 3 && validator.isAlpha(permissionData)) {
            success = true;
        }
        return success;
    } catch(error) {
        console.log('============permission validate model error =======================',error);
        return false;
    }
}