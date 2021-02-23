const express = require('express');
const passport = require('passport');
const router = express.Router();
const Employer = require('../controllers/employer');
const Validator = require("../services/validator");

router.post("/postEmployer", Employer.postEmployer);

router.post("/updateEmployer", Employer.postUpdateEmployer);

router.get("/deleteEmployer", Employer.deleteEmployer);

router.get("/getEmployerById", Employer.getEmployerById);

router.get("/getEmployers", Employer.getEmployers);


module.exports = router;