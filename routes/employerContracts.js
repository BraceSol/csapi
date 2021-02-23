const express = require('express');
const passport = require('passport');
const router = express.Router();
const EmployerContracts = require('../controllers/employerContracts');
const Validator = require("../services/validator");

router.post("/postEmployerContract", EmployerContracts.postEmployerContract);

router.post("/updateEmployerContract", EmployerContracts.postUpdateEmployerContract);

router.get("/deleteEmployerContract", EmployerContracts.deleteEmployerContract);

router.get("/getEmployerContractById", EmployerContracts.getEmployerContractById);

router.get("/getEmployerContracts", EmployerContracts.getEmployerContracts);


module.exports = router;