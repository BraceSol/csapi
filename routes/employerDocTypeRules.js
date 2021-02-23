const express = require('express');
const passport = require('passport');
const router = express.Router();
const EmployerDocTypeRules = require('../controllers/employerDocTypeRules');
const Validator = require("../services/validator");

router.post("/postEmployerDocTypeRule", EmployerDocTypeRules.postEmployerDocTypeRule);

router.post("/updateEmployerDocTypeRule", EmployerDocTypeRules.postUpdateEmployerDocTypeRule);

router.get("/deleteEmployerDocTypeRule", EmployerDocTypeRules.deleteEmployerDocTypeRule);

router.get("/getEmployerDocTypeRuleById", EmployerDocTypeRules.getEmployerDocTypeRuleById);

router.get("/getEmployerDocTypeRules", EmployerDocTypeRules.getEmployerDocTypeRules);

module.exports = router;