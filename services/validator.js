const { check } = require('express-validator');
var validator = require('validator');
const Device = require('../models/device');
let locales = ['AD', 'AT', 'AU', 'AZ', 'BE', 'BG', 'BR', 'BY', 'CA', 'CH', 'CN', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IN', 'IR', 'IS', 'IT', 'JP', 'KE', 'LI', 'LT', 'LU', 'LV', 'MT', 'MX', 'MY', 'NL', 'NO', 'NP', 'NZ', 'PL', 'PR', 'PT', 'RO', 'RU', 'SA', 'SE', 'SG', 'SI', 'TH', 'TN', 'TW', 'UA', 'US', 'ZA', 'ZM'];
exports.validatePermissionModel = async(req, res, next) => {

}
exports.validateUserSignUpModel = async(req, res, next) => {
    try {
        let { email, password, fullName, twoFactorEnabled, state, licenseNumber, professionName, lastLocation, deviceCode, deviceName } = req.body;
        let isError = false
        let message = "";
        let messages = [];
        console.log(email, password, fullName, twoFactorEnabled, state, licenseNumber, lastLocation, deviceCode, deviceName);
        if (!checkEmpty(email) && !checkEmpty(password) && !checkEmpty(fullName) && !checkEmpty(twoFactorEnabled.toString()) && !checkEmpty(state) && !checkEmpty(licenseNumber) && !checkEmpty(lastLocation) && !checkEmpty(deviceCode) && !checkEmpty(deviceName)) {
            if (!checkEmail(email)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Email is invalid...!");
            }
            if (!checkAlphaNumeric(password)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Password is not alpha numeric...!");
            }
            if (!checkLength(password, 6, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Password length is greater than 6 and less than 18...!");
            }
            if (!checkAlpha(fullName)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("fullName is invalid...!");
            }
            if (!checkLength(fullName, 3, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("fullName length should be greater then 3 and less then 12...!");
            }
            if (!checkBoolean(twoFactorEnabled.toString())) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("twoFactorEnabled is not boolean...!");
            }
            if (!checkAlpha(state)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("State should be alpha...!");
            }
            if (!checkLength(state, 4, 25)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("State should be greater then 4 and less then 25...!");
            }
            if (!checkAlphaNumeric(licenseNumber)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("License should be alpha numeric...!");
            }
            if (!checkLength(licenseNumber, 12, 12)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("License number should be 12...!");
            }
            // if(!checkAlpha(professionName)) {
            //     isError = true;
            //     message = "Invalid Field...!";
            //     messages.push("Profession name should be alpha...!");
            // } if(!checkLength(professionName,4,10)) {
            //     isError = true;
            //     message = "Invalid Field...!";
            //     messages.push("Profession name should be greater then 4 and less then 10");
            // } 
            if (!checkLatLong(lastLocation)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Not valid longitude or latitude...!");
            }
            if (!checkLength(deviceCode, 6, 60)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Device code should be minimum 8  and less then 30 alphabets...!");
            }
        } else {
            isError = true;
            message = "Fields cannot be empty...!";
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("==================== validate signup model error ========================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.checkKnownDevice = async(data) => {
    try {
        let device = await Device.fetchByUserAndDeviceId(data.userId, data.deviceCode);
        if (device) {
            device.lastLocation = data.lastLocation;
            return device;
        } else {
            return false;
        }
    } catch (error) {
        console.log('============== check known device error ==================', error);
        return false;
    }
}
exports.validateIndustryModel = async(req, res, next) => {
    try {
        let { industryName, description } = req.body;
        let isError = false;
        let message = "";
        let messages = [];
        if (!checkEmpty(industryName) && !checkEmpty(description)) {
            console.log('============here in if ==================');
            console.log('============ checkAlpha ===============', true, description);
            if (!checkAlpha(industryName)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Industry name should only contain alphabets...!");
            }
            if (!checkLength(industryName, 5, 18)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Industry name should be greater then 5 and less then 18");
            }
            if (!checkAlphaNumeric(description)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Industry description is invalid...!");
            }
            if (!checkLength(description, 10, 240)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Industry descsription should be greater then 10 and less then 240 characters...!");
            }
        } else {
            message = "Fields cannot be empty....!";
        }
        console.log('============ isError =================', isError);
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============industry model validation error ==================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateProfessionModel = async(req, res, next) => {
    try {
        let { industryId, professionName, description, isDefault } = req.body;
        let message = "";
        let messages = [];
        let isError = false;
        if (!checkEmpty(industryId) && !checkEmpty(professionName) && !checkEmpty(description) && !checkEmpty(isDefault.toString())) {
            if (!checkAlpha(professionName)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Profession name should contain only alphabets...!");
            }
            if (!checkLength(professionName, 3, 18)) {
                isError = true;
                message = "Invalid Fields...!";
                messages, push("Profession name should be greater then 5 and less then 18...!");
            }
            if (!checkAlphaNumeric(description)) {
                console.log('============== check alpha ==============', validator.isAlpha(description), description);
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Profession description should contain only alpha numeric...!");
            }
            if (!checkLength(description, 10, 240)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Profession description should be greater then 10 and less then 240...!");
            }
            if (!checkBoolean(isDefault.toString())) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("isDefault should be boolean...!");
            }
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============= validate profession model error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateSpecialtyModel = async(req, res, next) => {
    try {
        let { industryId, specialtyName, description } = req.body;
        let message = "";
        let messages = [];
        let isError = false;
        if (!checkEmpty(industryId) && !checkEmpty(specialtyName) && !checkEmpty(description)) {
            if (!checkAlpha(specialtyName)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Speicalty name should contain only alphabets...!");
            }
            if (!checkLength(specialtyName, 5, 18)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Specialty name should be greater then 5 and less then 18...!");
            }
            if (!checkAlphaNumeric(description)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Specialty description should contain only alpha numeric...!");
            }
            if (!checkLength(description, 5, 240)) {
                isError = true;
                message = "Invalid Fields...!";
                messages.push("Specialty description should be greater then 5 and less then 240...!");
            }
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============= validate specialty model error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateProfession2SpecialtyModel = async(req, res, next) => {
    try {
        let { professionId, specialtyId } = req.body;
        let message = "";
        let messages = [];
        let isError = false
        if (!checkEmpty(professionId) && !checkEmpty(specialtyId)) {
            if (!checkLength(professionId, 36, 36)) {
                message = "Invalid Field...!";
                messages.push("Profession id is invalid...!");
                isError = true;
            }
            if (!checkLength(specialtyId, 36, 36)) {
                message = "Invalid Field...!";
                messages.push("Specialty id is invalid...!");
                isError = true;
            }
        } else {
            message = "Required fields are missing...!";
            messages.push("Profession id or Specialty id is invalid...!");
            isError = true;
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("================= validate profession2specialty model error ==================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateVerifyPinModel = async(req, res, next) => {
    try {
        let { userId, pinCode, deviceCode } = req.body;
        let message = "";
        let messages = [];
        let isError = false;
        if (!checkEmpty(userId) && !checkEmpty(pinCode) && !checkEmpty(deviceCode)) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is invalid...!");
            }
            if (!checkNumeric(pinCode)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("pinCode should only contain numbers...!");
            }
            if (!checkLength(pinCode, 6, 6)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("pinCode should only contain 6 numbers...!");
            }
            if (!checkLength(deviceCode, 6, 60)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Device code should be minimum 8  and less then 30 alphabets...!");
            }
        } else {
            isError = true;
            message = "Fields are missing...!";
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("===============verify pin model error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateProfileTypeModel = async(req, res, next) => {
    try {
        let { profileName, description } = req.body;
        let isError = false;
        let message = "";
        let messages = [];
        if (!checkEmpty(profileName) && !checkEmpty(description)) {
            if (!checkAlpha(profileName)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Profile name should contain only alphabets...!");
            }
            if (!checkLength(profileName, 3, 18)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Profile name should be greater than 4 and less then 18 alphabets...!");
            }
            if (!checkAlphaNumeric(description)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Profile description should be alpha numeric...!");
            }
            if (!checkLength(description, 10, 240)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Profile description should be greater then 10 and less than 240 alphabets...!");
            }
        } else {
            isError = true;
            message = "Fields cannot be empty...!";
            messages.push("Profiel name of description is empty...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("================= validate profileTypeModel error ==================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateLoginModel = async(req, res, next) => {
    try {
        let { email, password, deviceCode, lastLocation, deviceName } = req.body;
        let isError = false;
        let message = "";
        let messages = [];
        if (!checkEmpty(email) && !checkEmpty(password) && !checkEmpty(deviceCode) && !checkEmpty(lastLocation) && !checkEmpty(deviceName)) {
            if (!checkEmail(email)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Email is in invalid format...!");
            }
            if (!checkLength(password, 6, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Password length must be greater then 6 and less then 18...!");
            }
            if (!checkLength(deviceCode, 6, 60)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Device code should be minimum 8  and less then 30 alphabets...!");
            }
            if (!checkLatLong(lastLocation)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("Latitude and Longitude should be correct like lat,long...!");
            }
        } else {
            isError = true;
            message = "Require fields cannot be empty";
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("=============== validate login error ==================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateWorkHistoryModel = async(req, res, next) => {
    try {
        const { userId, startDate, endDate, employerName, employerCity, employerState } = req.body;
        let message = "";
        let messages = [];
        let isError = false;
        if (userId) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is not correct...!")
            }
        } else {
            isError = true;
            message = "Required field missing...!";
            messages.push("User id is missing....!");
        }
        if (employerName) {
            if (!checkAlpha(employerName)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Facility name should be alpha...!");
            }
            if (!checkLength(employerName, 3, 50)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Facility name should be greater then 3 and less then 18...!")
            }
        } else {
            isError = true;
            message = "Required field is missing...!";
            messages.push("Facility name is missing...!");
        }
        if (startDate) {
            if (!checkDate(startDate)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Start date is invalid...!");
            }
        } else {
            isError = true;
            message = "Required field is missing...!";
            messages.push("Start date is missing...!");
        }
        if (endDate) {
            if (!checkDate(endDate)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("End date is invalid...!");
            }
        } else {
            isError = true;
            message = "Required field is missing...!";
            messages.push("End date is missing...!");
        }
        if (employerCity) {
            if (!checkAlpha(employerCity)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Employer city name should be alpha...!");
            }
            if (!checkLength(employerCity, 3, 18)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Employer city should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required field is missing...!";
            messages.push("Employer city is missing...!");
        }
        if (employerState) {
            if (!checkAlpha(employerState)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Employer state name should be alpha...!");
            }
            if (!checkLength(employerState, 2, 18)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Employer state should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required field is missing...!";
            messages.push("Employer state is missing...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("========== work history model validator error =============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateEducationModel = async(req, res, next) => {
    try {
        const { userId, schoolName, city, state, postalCode, degree, graduationDate } = req.body;
        let isError = false;
        let message = "";
        let messages = [];
        if (userId) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("User id is missing...!");
        }
        if (schoolName) {
            if (!checkAlpha(schoolName)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("School name should be alpha...!");
            }
            if (!checkLength(schoolName, 3, 50)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("School name should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("School name is missing...!");
        }
        if (city) {
            if (!checkAlpha(city)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("City should be alpha...!");
            }
            if (!checkLength(city, 3, 50)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("City should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("city is missing...!");
        }
        if (state) {
            if (!checkAlpha(state)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("state should be alpha...!");
            }
            if (!checkLength(state, 2, 50)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("state should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("state is missing...!");
        }
        if (postalCode) {
            if (!checkPostalCode(postalCode)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("postalCode is not valid...!");
            }
            if (!checkLength(postalCode, 4, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("postalCode should be greater then 4 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("postalCode is missing...!");
        }
        if (degree) {
            if (!checkAlpha(degree)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("degree should be alpha...!");
            }
            if (!checkLength(degree, 2, 50)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("degree should be greater then 2 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("degree is missing...!");
        }
        if (graduationDate) {
            if (!checkDate(graduationDate)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("graduationDate has invalid date format....!")
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("graduationDate is missing...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== Education model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateLicenseModel = async(req, res, next) => {
    try {
        const { userId, licenseState, licenseCode, issueDate, expirationDate } = req.body;
        let isError = false;
        let message = "";
        let messages = [];
        if (userId) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("User id is missing...!");
        }
        if (licenseState) {
            if (!checkAlpha(licenseState)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("licenseState should be alpha...!");
            }
            if (!checkLength(licenseState, 2, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("licenseState should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("licenseState is missing...!");
        }
        if (licenseCode) {
            if (!checkLength(licenseCode, 3, 25)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("licenseCode should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("licenseState is missing...!");
        }
        if (issueDate) {
            if (!checkDate(issueDate)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("issueDate has invalid date format....!")
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("issueDate is missing...!");
        }
        if (expirationDate) {
            if (!checkDate(expirationDate)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("expirationDate has invalid date format....!")
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("expirationDate is missing...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== Licence model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateCertificationModel = async(req, res, next) => {
    try {
        const { userId, certificationName, issuingBody, issueDate, expirationDate } = req.body;
        let isError = false;
        let message = "";
        let messages = [];
        if (userId) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("User id is missing...!");
        }
        if (certificationName) {
            if (!checkAlpha(certificationName)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("certificationName should be alpha...!");
            }
            if (!checkLength(certificationName, 3, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("certificationName should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("certificationName is missing...!");
        }
        if (issuingBody) {
            if (!checkAlpha(issuingBody)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("issuingBody should be alpha...!");
            }
            if (!checkLength(issuingBody, 3, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("issuingBody should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("issuingBody is missing...!");
        }
        if (issueDate) {
            if (!checkDate(issueDate)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("issueDate has invalid date format....!")
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("issueDate is missing...!");
        }
        if (expirationDate) {
            if (!checkDate(expirationDate)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("expirationDate has invalid date format....!")
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("expirationDate is missing...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== Certification model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateUserIdModel = async(req, res, next) => {
    try {
        const userId = req.query.userId;
        let isError = false;
        let message = "";
        let messages = [];
        if (userId) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("User id is missing...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== User id validate model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateUpdateProfessionalUserModel = async(req, res, next) => {
    try {
        const { userId, adminId, professionId, firstName, lastName, email } = req.body;
        let isError = false;
        let message = "";
        let messages = [];
        if (userId) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("User id is missing...!");
        }
        if (adminId) {
            if (!checkLength(adminId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Admin id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("Admin id is missing...!");
        }
        if (professionId) {
            if (!checkLength(professionId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Profession id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("Profession id is missing...!");
        }
        if (email) {
            if (!checkEmail(email)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Email is invalid...!");
            }
        }
        if (firstName) {
            if (!checkAlpha(firstName)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("firstName should be alpha...!");
            }
            if (!checkLength(firstName, 3, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("firstName should be greater then 3 and less then 18 alphabets...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("firstName is missing...!");
        }
        if (lastName) {
            if (!checkAlpha(lastName)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("lastName should be alpha...!");
            }
            if (!checkLength(lastName, 3, 18)) {
                isError = true;
                message = "Invalid Field...!";
                messages.push("lastName should be greater then 3 and less then 18 alphabets...!");
            }
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== Professional user update validate model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateAdminAndUserIdModel = async(req, res, next) => {
    try {
        const { adminId, userId } = req.query;
        let isError = false;
        let message = "";
        let messages = [];
        if (userId) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("User id is missing...!");
        }
        if (adminId) {
            if (!checkLength(adminId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Admin id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("Admin id is missing...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== Admin and user id  validate model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateEmailModel = async(req, res, next) => {
    try {
        const email = req.query.email;
        let isError = false;
        let message = "";
        let messages = [];
        if (email) {
            if (!checkEmail(email)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Email is invalid...!");
            }
        } else {
            isError = true;
            message = "Required field is missing...!";
            messages.push("Email is missing...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== Email validate model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateResetPasswordModel = async(req, res, next) => {
    try {
        const { userId, newPassword, confirmPassword } = req.body;
        // const email = req.query.email;
        let isError = false;
        let message = "";
        let messages = [];
        if (userId) {
            if (!checkLength(userId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("User id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("User id is missing...!");
        }
        if (newPassword) {
            if (!checkLength(newPassword, 6, 18)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("New password should be greater then 6 and less then 18...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("New password is missing...!");
        }
        if (confirmPassword) {
            if (!checkLength(confirmPassword, 6, 18)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Confirm password should be greater then 6 and less then 18...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("Confirm password is missing...!");
        }
        if (!checkEquals(newPassword, confirmPassword)) {
            isError = true;
            message = "Invalid field...!";
            messages.push("Passowrds are not equals....!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== Reset password validate model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.validateFetchAdminIdModel = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isError = false;
        let message = "";
        let messages = [];
        if (adminId) {
            if (!checkLength(adminId, 36, 36)) {
                isError = true;
                message = "Invalid field...!";
                messages.push("Admin id is invalid...!");
            }
        } else {
            isError = true;
            message = "Required fields are missing...!";
            messages.push("Admin id is missing...!");
        }
        if (isError) {
            return res.status(200).json({
                message,
                messages,
                hasError: true
            })
        } else {
            next();
        }
    } catch (error) {
        console.log("============== Fetch admin validate model validator error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
const checkEquals = (str, compare) => {
    if (str === compare) {
        return true;
    } else {
        return false;
    }
}
const checkEmpty = (str) => {
    if (validator.isEmpty(str)) {
        return true;
    } else {
        return false;
    }
}
const checkLength = (str, min, max) => {
    if (validator.isLength(str, { min: min, max: max })) {
        return true;
    } else {
        return false;
    }
}
const checkLatLong = (str) => {
    if (validator.isLatLong(str)) {
        return true;
    } else {
        return false;
    }
}
const checkEmail = (str) => {
    if (validator.isEmail(str)) {
        return true;
    } else {
        return false;
    }
}
const checkAlpha = (str) => {
    if (str.match(/^[A-Za-z ]+$/)) {
        return true;
    } else {
        return false;
    }
}
const checkAlphaNumeric = (str) => {
    let text = str.toString();
    console.log('==================match result================', str.match("^[A-Za-z0-9]+$"));
    if (str.match(/^[A-Za-z0-9 ]+$/)) {
        return true;
    } else {
        return false;
    }
}
const checkDate = (str) => {
    if (validator.isDate(str)) {
        return true;
    } else {
        return false;
    }
}
const checkPostalCode = (str) => {
    if (true) {
        return true;
    } else {
        return false;
    }
}
const checkNumeric = (str) => {
    if (validator.isNumeric(str)) {
        return true;
    } else {
        return false;
    }
}
const checkBoolean = (str) => {
    if (validator.isBoolean(str)) {
        return true;
    } else {
        return false;
    }
}