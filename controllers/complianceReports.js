const ComplianceReport = require("../models/complianceReports");
const UserController = require("./user");
const Employer = require("../models/employer");
const Department = require("../models/employerDepartments");
const Uploads = require("../models/uploads");
const DocumentTypeRules = require('../models/documentTypeRules');
const Location = require("../models/employerLocations");
exports.postComplianceReport = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                });
            }
        }
        let employer = await Employer.fetchById(data.employerId);
        if (employer) {
            data = JSON.parse(JSON.stringify(data));
            // let department = await Department.fetchByEmployerId(employer.id);
            // let location = await Location.fetchByEmployerId(employer.id);
            // data.departmentId = department ? department.id : null;
            // data.locationId = location ? location.id : null;
            await calculateScore(data);
            let report = await ComplianceReport.create(data);
            if (report.success) {
                return res.status(200).json({
                    message: "Report created successfully...!",
                    hasError: false
                })
            } else {
                return res.status(200).json({
                    message: "Report creation failed...!"
                })
            }
        } else {
            return res.status(200).json({
                message: "Employer not found...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("================ post ComplianceReport error ============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.updateComplianceReport = async(req, res, next) => {
    try {
        let data = req.body;
        let adminId = data.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user. Invalid request...!",
                    hasError: true
                });
            }
        }
        let report = await ComplianceReport.update(data);
        if (report.success) {
            return res.status(200).json({
                message: "Report updated successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Report updation failed...!"
            })
        }
    } catch (error) {
        console.log("================ post reports update error ============", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getReportsByEmployerId = async(req, res, next) => {
    try {
        let employerId = req.query.employerId;
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
        let reports = await ComplianceReport.fetchAllByEmployerId(employerId);
        if (reports) {
            return res.status(200).json({
                message: "Employer reports fetched successfully...!",
                "items": reports,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Employer Reports fetching failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== Reports fetch all by employer id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getReportsByUserId = async(req, res, next) => {
    try {
        let userId = req.query.userId;
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
        let reports = await ComplianceReport.fetchAllByUserId(userId);
        if (reports) {
            return res.status(200).json({
                message: "User reports fetched successfully...!",
                "items": reports,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "User Reports fetching failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== Reports fetch all by user id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
exports.getReportById = async(req, res, next) => {
    try {
        let reportId = req.query.complianceReportId;
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
        let report = await ComplianceReport.fetchById(reportId);
        if (report) {
            return res.status(200).json({
                message: "Report fetched successfully...!",
                report,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Report fetching failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== Report fetch by report id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.getReports = async(req, res, next) => {
    try {
        let adminId = req.query.adminId;
        if (adminId) {
            let isAdmin = await UserController.isAdminUser(adminId);
            if (!isAdmin) {
                return res.status(200).json({
                    message: "Wrong admin user invalid request...!",
                    hasError: true
                })
            }
        }

        let items = await ComplianceReport.fetchAll(req.query);
        if (items) {
            return res.status(200).json({
                message: "ComplianceReports fetched successfully...!",
                length: items.length,
                items,
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "ComplianceReports fetching failed...!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("===== ComplianceReports fetch error ======", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}

exports.deleteReport = async(req, res, next) => {
    try {
        let reportId = req.query.reportId;
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
        let isDelete = await ComplianceReport.delete(reportId);
        if (isDelete) {
            return res.status(200).json({
                message: "Report deleted successfully...!",
                hasError: false
            })
        } else {
            return res.status(200).json({
                message: "Report deleting failed....!",
                hasError: true
            })
        }
    } catch (error) {
        console.log("====== Report delete by report id controller error ===========", error);
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}
const calculateScore = async(data) => {
    try {
        let uploads = await Uploads.fetchAllByUserId(data.userId);
        if (uploads) {
            let allDocumentsTotalScore = uploads.length * 100;
            let achievedScoreOfDocuments = 0;
            let totalScoreOfRules = 0;
            let achievedScoreOfRules = 0;
            for (let i = 0; i < uploads.length; i++) {
                let uploadElement = uploads[i];
                let documentTypeId = uploadElement.document.documentTypeId;
                let pageDetail = JSON.parse(uploadElement.document.pageDetail);
                let documentTypeRules = await DocumentTypeRules.fetchAllByDocumentType(documentTypeId);
                for (let j = 0; k < documentTypeRules.length; j++) {
                    let ruleElement = documentTypeRules[j];
                    let ruleQuery = JSON.parse(ruleElement.ruleQuery);
                    let ruleConfig = JSON.parse(ruleElement.ruleConfig);
                    const fieldsArray = Object.entries(ruleConfig.fields).map((e) => ({
                        [e[0]]: e[1]
                    }));
                    totalScoreOfRules = ruleQuery.rules.length * 100;
                    achievedScoreOfRules = 0;
                    for (let k = 0; k < pageDetail.length; k++) {
                        let answerElement = pageDetail[k];
                        let conditionElement = null;
                        let isAtttribute = false;
                        for (let l = 0; l < fieldsArray.length; l++) {
                            let fieldElement = fieldsArray[l];
                            for (var key in fieldElement) {
                                for (let m = 0; m < ruleQuery.rules; m++) {
                                    let ruleElement = ruleQuery.rules[m];
                                    if (ruleElement.field === key) {
                                        conditionElement = ruleElement;
                                        isAtttribute = true;
                                        break;
                                    }
                                }
                                if (isAtttribute) {
                                    break;
                                }
                            }
                            if (isAtttribute) {
                                break;
                            }
                        }
                        if (!answerElement.fieldOptions.length) {
                            let isMatched = await checkOperatorAndMatchAnswer(conditionElement, answerElement);
                            if (isMatched) {
                                achievedScoreOfRules += 100;
                            }
                        } else {
                            let toBeSubstract = 0;
                            for (let n = 0; n < answerElement.fieldOptions.length; n++) {
                                let answerObject = answerElement.fieldOptions[n];
                                if (!answerObject.answer) {
                                    toBeSubstract += (n / answerElement.fieldOptions.length) * 100
                                } else {
                                    let isMatched = await checkOperatorAndMatchAnswer(conditionElement, answerObject);
                                    if (isMatched) {
                                        achievedScoreOfRules += 100 - (toBeSubstract > 100 ? 100 : toBeSubstract);
                                    }
                                }
                            }
                        }
                    }

                }
                achievedScoreOfDocuments += (achievedScoreOfRules / totalScoreOfRules)
            }
            data.currentScore = (achievedScoreOfDocuments / allDocumentsTotalScore) * 100;
            console.log("====current score =======", data.currentScore);
            return;
        }
    } catch (error) {
        console.log('============== calculation error ==============', error);

    }
}
const checkOperatorAndMatchAnswer = async(conditionObject, answerObject) => {
    try {
        let isSuccess = false;
        if (conditionObject.operator === '=') {
            if (answerObject.answer === conditionObject.value) {
                isSuccess = true
            }
        }
        if (conditionObject.operator === '>=') {
            if (answerObject.answer >= conditionObject.value) {
                isSuccess = true
            }
        }
        if (conditionObject.operator === '<=') {
            if (answerObject.answer <= conditionObject.value) {
                isSuccess = true
            }
        }
        if (conditionObject.operator === '!=') {
            if (answerObject.answer !== conditionObject.value) {
                isSuccess = true
            }
        }
        if (conditionObject.operator === '>') {
            if (answerObject.answer > conditionObject.value) {
                isSuccess = true
            }
        }
        if (conditionObject.operator === '<') {
            if (answerObject.answer < conditionObject.value) {
                isSuccess = true
            }
        }
        return isSuccess;
    } catch (error) {
        console.log('============== checkAndMatchOperator error ==============', error);
        return false;
    }
}