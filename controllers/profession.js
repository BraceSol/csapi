const Profession = require("../models/profession");
const Profession2specialty = require("../models/profession2specialty");
const UserController = require("./user");
const Specialty = require("../models/specialty")
exports.getProfessions = async(req, res, next) => {
    try {
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
        let items = await Profession.fetchAll();
        if (items) {
            return res.status(200).json({
                message: "Professions fetched successfully...!",
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Profession fetching failed...!",
                hasError: true
            })
        }

    } catch (error) {
        console.log("=================== get professions controller error ================", error);
        return res.status(200).json({
            messsage: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getProfessionsByIndustry = async(req, res, next) => {
    try {
        const industryId = req.query.industryId;
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            if (industryId) {
                let items = await Profession.fetchByIndustry(industryId);
                if (items) {
                    return res.status(200).json({
                        message: "Professions fetched successfully...!",
                        items,
                        hasError: false
                    })
                } else {
                    return res.status(200).json({
                        message: "Professions fetchind failed...!",
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
        console.log("================== get profession by industry controller error =====================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getProfessionById = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let profession = await Profession.fetchById(req.query.professionId);
            if (profession) {
                profession = JSON.parse(JSON.stringify(profession));
                let specialtiesFormProfession = await Profession2specialty.fetchAllByProfessionId(profession.id);
                let specialties = [];
                for (let index = 0; index < specialtiesFormProfession.length; index++) {
                    let element = specialtiesFormProfession[index];
                    let specialty = await Specialty.fetchById(element.professionId);
                    if (specialty) {
                        specialties.push({
                            "specialtyName": specialty.specialtyName,
                            "id": specialty.id
                        })
                    }
                }
                profession.specialties = specialties;
                return res.status(200).json({
                    message: "Profession fetched successfully...!",
                    hasError: true,
                    profession
                })

            } else {
                return res.status(200).json({
                    message: "Profession not found...!",
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
exports.deleteProfession = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let isDelete = await Profession.delete(req.query.professionId);
            if (isDelete) {
                let specialties = await Profession2specialty.fetchAllByProfessionId(req.query.professionId);
                specialties.forEach(async element => {
                    await Profession2specialty.delete(element.id);
                });
                return res.status(200).json({
                    message: "Profession deleted successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Profession deletion failed...!",
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
exports.postProfession = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        let isAdmin = await UserController.isAdminUser(adminId);
        if (isAdmin) {
            let profession = await Profession.create(data);
            let specialtyIds = data.specialtyIds;
            if (profession.success) {
                specialtyIds.forEach(async element => {
                    let p2sData = {
                        "professionId": profession.profession.id,
                        "specialtyId": element
                    }
                    await Profession2specialty.create(p2sData);
                });
                let items = await Profession.fetchAll();
                return res.status(200).json({
                    message: "Profession created successfully...!",
                    items,
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Profession creation failed...!",
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
        console.log("=================== post profession controller error ===================", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.updateProfession = async(req, res, next) => {
    try {
        let data = req.body;

        let profession = await Profession.update(data);
        let specialtyIds = data.specialtyIds;

        if (profession.success) {
            let specialties = await Profession2specialty.fetchAllByProfessionId(data.professionId);
            specialties.forEach(async element => {
                await Profession2specialty.delete(element.id);
            });
            specialtyIds.forEach(async element => {
                let p2sData = {
                    "professionId": profession.profession.id,
                    "specialtyId": element
                }
                await Profession2specialty.create(p2sData);
            });
            let items = await Profession.fetchAll();
            return res.status(200).json({
                message: "Profession updated successfully...!",
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Profession updation failed...!",
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