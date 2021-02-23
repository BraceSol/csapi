const express = require('express');
const passport = require('passport');
const router = express.Router();
const Industry = require('../controllers/industry');
const Validator = require("../services/validator");
router.get("/industry", Industry.getIndustries);

router.post("/industry", Validator.validateIndustryModel, Industry.postIndustries)

router.post("/updateIndustry", Validator.validateIndustryModel, Industry.postUpdateIndustry)

router.get("/industryById", Industry.getIndustryById);

router.get("/deleteIndustry", Industry.getDeleteIndustry);

module.exports = router;