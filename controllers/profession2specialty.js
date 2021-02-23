const Profession2specialty = require("../models/profession2specialty");
const UserController = require("./user");
const Specialty = require("../models/specialty");
exports.getProfession2Specialties = async(req, res, next) => {
    try {
        let profession2specialties = await Profession2specialty.fetchAll();
        if (profession2specialties) {
            return res.status(200).json({
                message: "Profession specialties fetched successfully...!",
                hasError: false,
                profession2specialties
            })
        } else {
            return res.status(200).json({
                message: "Professions specialties fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("======================= get profession2specialties error =====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postProfession2Specialty = async(req, res, next) => {
    try {
        let data = req.body;
        let profession2specialty = await Profession2specialty.create(data);
        if (profession2specialty.success) {
            let profession2specialties = await Profession2specialty.fetchAll();
            return res.status(200).json({
                message: "Profession specialty created successfully...!",
                hasError: false,
                profession2specialties
            })
        } else {
            return res.status(200).json({
                message: "Profession specialty creation failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("=============== post profession2specialty error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.fetchSpecialtiesByProfession = async(req, res, next) => {
    try {
        let data = req.query;
        let adminId = req.query.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                })
            }
        }
        let specialties = await Profession2specialty.fetchAllByProfessionId(data.professionId);
        let items = [];
        for (let index = 0; index < specialties.length; index++) {
            let element = specialties[index];
            let specialty = await Specialty.fetchById(element.specialtyId);
            if (specialty) {
                let data = {
                    "id": specialty.id,
                    "specialtyName": specialty.specialtyName
                };
                items.push(data);
            }
        }
        return res.status(200).json({
            message: "Specialties fetched successfully...!",
            items,
            hasError: false
        })
    } catch (error) {
        console.log("=============== get profession2specialty specialties error ================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}