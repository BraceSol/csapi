const securePin = require("secure-pin");
const becrypt = require('bcryptjs');
const User = require("../models/user")
const UserProfile = require('../models/userProfile');
exports.generatePin = async() => {
    try {
        let pin = securePin.generatePinSync(6);
        pin = Number(pin);
        return 123456;
    } catch (error) {
        console.log("================== generate pin error ===============", error);
    }
}
exports.sperateName = async(str) => {
    try {
        let splitted = [];
        splitted = str.split(" ");
        console.log("==========splitted name ============", splitted);
        return splitted;
    } catch (error) {
        console.log("============== splitted string error ================", error);
    }
}
exports.matchPassword = async(password, hasedPassword) => {
    try {
        let isMatched = await becrypt.compare(password, hasedPassword);
        return isMatched;
    } catch (error) {
        console.log("================= hashed password error ==================", error);
        return false;
    }
}
exports.isAdminUser = async(adminId) => {
    try {
        let admin = await User.fetchNonProfessionalUser(adminId);
        if (admin) {
            let userProfile = await UserProfile.fetchByUserId(adminId);
            if (userProfile) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log("========helper error ==========", error)
        return false;
    }
}
exports.documentStatuses = async() => {
    let data = {
        "reject": 10,
        "accept": 20,
        "hold": 30,
        "expired": 40
    }
    return data;
}