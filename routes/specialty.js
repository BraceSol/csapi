const express = require('express');
const passport = require('passport');
const router = express.Router();
const Specialty = require('../controllers/specialty');
const Validator = require("../services/validator");

router.get("/specialty",Specialty.getSpecialties);

router.get("/specialtybyindustry", Specialty.getSpecialtiesByIndustry);

router.post("/specialty", Validator.validateSpecialtyModel, Specialty.postSpecialty)

router.post("/updateSpecialty", Specialty.updateSpecialty);

router.get("/specialtyById",Specialty.getSpecialtyId);

router.get("/deleteSpecialty", Specialty.deleteSpecialty);

module.exports = router;