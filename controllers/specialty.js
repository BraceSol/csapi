const Specialty = require("../models/specialty");
const Profession2specialty = require("../models/profession2specialty");
const UserController = require("./user")
const Profession = require("../models/profession");

exports.getSpecialties = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let specialties = await Specialty.fetchAll();
            if (specialties) {
                return res.status(200).json({
                    message: "Specialties fetched successfully...!",
                    "items": specialties,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Specialties fetching error....!",
                    hasError: true,
                })
            }
        } else {
            return res.status(200).json({
                message: "Wrong admin user. Invalid request...!",
                hasError: true
            })
        }

    } catch (error) {
        console.log("============= get specialties controller error =================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getSpecialtiesByIndustry = async(req, res, next) => {
    try {
        const industryId = req.query.industryId;
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            if (industryId) {
                let specialties = await Specialty.fetchByIndustry(industryId);
                if (specialties) {
                    return res.status(200).json({
                        message: "Specialties fetched successfully...!",
                        "items": specialties,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Specialties fetchind failed...!",
                        hasError: true
                    })
                }
            } else {
                return res.status(200).json({
                    message: "Industry id is required....!",
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
        console.log("================== get specialties by industry controller error =====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getSpecialtyId = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let specialty = await Specialty.fetchById(req.query.specialtyId);
            if (specialty) {
                specialty = JSON.parse(JSON.stringify(specialty));
                let professionsFromSpecialty = await Profession2specialty.fetchAllBySpecialtyId(specialty.id);
                let professions = [];
                for (let index = 0; index < professionsFromSpecialty.length; index++) {
                    let element = professionsFromSpecialty[index];
                    let profession = await Profession.fetchById(element.professionId);
                    if (profession) {
                        professions.push({
                            "professionName": profession.professionName,
                            "id": profession.id
                        })
                    }
                }
                specialty.professions = professions;
                console.log(professions);
                return res.status(200).json({
                    message: "Specialty fetched successfully...!",
                    hasError: true,
                    specialty
                })

            } else {
                return res.status(200).json({
                    message: "Specialty not found...!",
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
        console.log("================== get profession by industry controller error =====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.deleteSpecialty = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let isDelete = await Specialty.delete(req.query.specialtyId);
            if (isDelete) {
                let professions = await Profession2specialty.fetchAllBySpecialtyId(req.query.specialtyId);
                professions.forEach(async element => {
                    await Profession2specialty.delete(element.id);
                });
                return res.status(200).json({
                    message: "Specialty deleted successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Specialty deletion failed...!",
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
        console.log("================== delete profession by id controller error =====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.postSpecialty = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let specialty = await Specialty.create(data);
            let professionIds = data.professionIds;
            if (specialty.success) {
                professionIds.forEach(async element => {
                    let p2sData = {
                        "professionId": element,
                        "specialtyId": specialty.specialty.id
                    }
                    console.log(p2sData);
                    await Profession2specialty.create(p2sData);
                });
                let specialties = await Specialty.fetchAll();
                return res.status(200).json({
                    message: "Specialty created successfully...!",
                    hasError: false,
                    "items": specialties
                })
            } else {
                return res.status(200).json({
                    message: "Specialty creation failed...!",
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
        console.log("================ post specialty controller error ===============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.updateSpecialty = async(req, res, next) => {
    try {
        let data = req.body;

        let specialty = await Specialty.update(data);
        let professionIds = data.professionIds;

        if (specialty.success) {
            let professions = await Profession2specialty.fetchAllBySpecialtyId(data.specialtyId);
            professions.forEach(async element => {
                await Profession2specialty.delete(element.id);
            });
            professionIds.forEach(async element => {
                let p2sData = {
                    "professionId": element,
                    "specialtyId": specialty.specialty.success
                }
                await Profession2specialty.create(p2sData);
            });
            let items = await Specialty.fetchAll();
            return res.status(200).json({
                message: "Specialty updated successfully...!",
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Specialty updation failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("=================== post profession controller error ===================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}