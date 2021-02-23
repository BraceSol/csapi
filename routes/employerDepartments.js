const express = require('express');
const passport = require('passport');
const router = express.Router();
const EmployerDepartments = require('../controllers/employerDepartments');
const Validator = require("../services/validator");

router.post("/postEmployerDepartment", EmployerDepartments.postEmployerDepartment);

router.post("/updateEmployerDepartment", EmployerDepartments.postUpdateEmployerDepartment);

router.get("/deleteEmployerDepartment", EmployerDepartments.deleteEmployerDepartment);

router.get("/getEmployerDepartmentById", EmployerDepartments.getEmployerDepartmentById);

router.get("/getEmployerDepartments", EmployerDepartments.getEmployerDepartments);


module.exports = router;