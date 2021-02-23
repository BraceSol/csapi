const express = require('express');
const passport = require('passport');
const router = express.Router();
const EmployerLocations = require('../controllers/employerLocations');
const Validator = require("../services/validator");

router.post("/postEmployerLocation", EmployerLocations.postEmployerLocation);

router.post("/updateEmployerLocation", EmployerLocations.postUpdateEmployerLocation);

router.get("/deleteEmployerLocation", EmployerLocations.deleteEmployerLocation);

router.get("/getEmployerLocationById", EmployerLocations.getEmployerLocationById);

router.get("/getEmployerLocations", EmployerLocations.getEmployerLocations);


module.exports = router;