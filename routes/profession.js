const express = require('express');
const passport = require('passport');
const router = express.Router();
const Profession = require('../controllers/profession');
const Validator = require("../services/validator");
router.get("/profession",Profession.getProfessions);

router.get("/professionbyindustry",Profession.getProfessionsByIndustry);

router.post("/profession", Validator.validateProfessionModel, Profession.postProfession)

router.post("/updateProfession", Profession.updateProfession);

router.get("/professionById",Profession.getProfessionById);

router.get("/deleteProfession", Profession.deleteProfession);

module.exports = router;