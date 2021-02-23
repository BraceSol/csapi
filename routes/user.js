const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../controllers/user');
const Validator = require("../services/validator");

router.post("/signup", Validator.validateUserSignUpModel, User.postUser);

router.post("/verifyPin", Validator.validateVerifyPinModel, User.verifyUserPin);

router.post("/resendPin", User.resendPin);

router.post("/login", Validator.validateLoginModel, User.postLogin);

router.get("/profiles", Validator.validateUserIdModel, User.getUserProfiles);

router.get("/professionals", Validator.validateUserIdModel, User.getProfessionalUsers);

router.post("/updateProfessional", Validator.validateUpdateProfessionalUserModel, User.updateProfessionalUser);

router.get("/searchEmail", Validator.validateEmailModel, User.searchEmail);

router.post("/resetPassword", Validator.validateResetPasswordModel, User.resetPassword);

router.get("/professionalProfile", Validator.validateAdminAndUserIdModel, User.fetchProfessionalUserProfile);

router.get("/getAdmin", Validator.validateFetchAdminIdModel, User.fetchAdminUser);

router.get("/getAdmins", Validator.validateFetchAdminIdModel, User.fetchAdminUsers);

router.get("/removeAdmin", User.removeNonProfessionalUser);

router.post("/updateNonProfessionalUser", User.updateAdminUser);

router.post("/professionalSearch", User.fetchProfessionalUsersBySearch);

router.post("/createProfessional", User.postUser);
module.exports = router;