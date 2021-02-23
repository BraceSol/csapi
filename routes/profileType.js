const express = require('express');
const passport = require('passport');
const router = express.Router();
const ProfileType = require('../controllers/profileType');
const Validator = require("../services/validator");
router.get("/profileTypes",ProfileType.getProfileTypes);

router.post("/profileTypes", Validator.validateProfileTypeModel, ProfileType.postProfileType)

module.exports = router;