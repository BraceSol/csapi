const express = require('express');
const passport = require('passport');
const router = express.Router();
const Employees = require('../controllers/employees.js');
const Validator = require("../services/validator");

router.post("/postEmployerEmployee", Employees.postEmployerEmployee);

router.post("/updateEmployerEmployee", Employees.postUpdateEmployerEmployee);

router.get("/deleteEmployerEmployee", Employees.deleteEmployerEmployee);

router.get("/getEmployerEmployeeById", Employees.getEmployerEmployeeById);

router.get("/getEmployerEmployees", Employees.getEmployerEmployees);


module.exports = router;