const express = require('express');
const passport = require('passport');
const router = express.Router();
const Education = require('../controllers/education');
const Validator = require("../services/validator");

router.post("/createEducation", Education.postEducation);

router.post("/updateEducation", Education.updateEducation);

router.get("/getUserEducation", Validator.validateUserIdModel, Education.getEducationByUserId);

router.get("/getEducationById", Education.getEducationById);

router.get("/deleteEducation", Education.deleteEducation);
module.exports = router;