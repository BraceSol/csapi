const express = require('express');
const passport = require('passport');
const router = express.Router();
const Certification = require('../controllers/certification');
const Validator = require("../services/validator");

router.post("/createCertification", Certification.postCertification);

router.post("/updateCertification", Certification.updateCertification);

router.get("/getUserCertification", Certification.getCertificationByUserId);

router.get("/getCertificationById", Certification.getCertificationById);

router.get("/deleteCertification", Certification.deleteCertification);

module.exports = router;