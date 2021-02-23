const express = require('express');
const passport = require('passport');
const router = express.Router();
const Profession2specialty = require('../controllers/profession2specialty');
const Validator = require("../services/validator");

router.get("/professionspecialty", Profession2specialty.getProfession2Specialties);

router.get("/specialtiesByProfession", Profession2specialty.fetchSpecialtiesByProfession);

router.post("/professionspecialty", Validator.validateProfession2SpecialtyModel, Profession2specialty.postProfession2Specialty);


module.exports = router;