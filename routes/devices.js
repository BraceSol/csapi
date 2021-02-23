const express = require('express');
const passport = require('passport');
const router = express.Router();
const Device = require('../controllers/devices');
const Validator = require("../services/validator");

router.get("/getAllDevices", Device.getDevices);

router.get("/getDeviceById", Device.getById);

router.get("/getDevicesByUserId", Device.getDevicesByUserId);

router.get("/removeDevice", Device.removeDevice);

router.post("/updateDevice", Device.updateDevice);

module.exports = router;