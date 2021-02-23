const express = require('express');
const passport = require('passport');
const router = express.Router();
const ComplianceReport = require('../controllers/complianceReports');
const Validator = require("../services/validator");
router.get("/reportsByEmployerId", ComplianceReport.getReportsByEmployerId);

router.get("/reportsByUserId", ComplianceReport.getReportsByUserId);

router.post("/createComplianceReport", ComplianceReport.postComplianceReport)

router.post("/updateComplianceReport", ComplianceReport.updateComplianceReport)

router.get("/complianceReportById", ComplianceReport.getReportById);

router.get("/deleteComplianceReport", ComplianceReport.deleteReport);

router.get("/getComplianceReports", ComplianceReport.getReports);

module.exports = router;