const express = require('express');
const passport = require('passport');
const router = express.Router();
const EmployerDocTypes = require('../controllers/employerDocTypes');
const Validator = require("../services/validator");

router.post("/postEmployerDocType", EmployerDocTypes.postEmployerDocType);

router.post("/updateEmployerDocType", EmployerDocTypes.postUpdateEmployerDocType);

router.get("/deleteEmployerDocType", EmployerDocTypes.deleteEmployerDocType);

router.get("/getEmployerDocTypeById", EmployerDocTypes.getEmployerDocTypeById);

router.get("/getEmployerDocTypes", EmployerDocTypes.getEmployerDocTypes);


module.exports = router;