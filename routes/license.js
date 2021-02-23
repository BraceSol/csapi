const express = require('express');
const passport = require('passport');
const router = express.Router();
const License = require('../controllers/license');
const Validator = require("../services/validator");

router.post("/createLicense", License.postLicense);

router.post("/updateLicense", License.updateLicense);

router.get("/getUserLicense", Validator.validateUserIdModel, License.getLicenseByUserId);

router.get("/getLicenseById", License.getLicenseById);

router.get("/deleteLicense", License.deleteLicense);

module.exports = router;