const express = require('express');
const passport = require('passport');
const router = express.Router();
const WorkHistory = require('../controllers/workHistory');
const Validator = require("../services/validator");

router.post("/createWorkHistory", WorkHistory.postWorkHistory);

router.post("/updateWorkHistory", WorkHistory.updateWorkHistory);

router.get("/getUserWorkHistory", Validator.validateUserIdModel, WorkHistory.getUserWorkHistory);

router.get("/getWorkHistoryById", WorkHistory.getWorkHistoryById);

router.get("/deleteWorkHistory", WorkHistory.getDeleteWorkHistory);
module.exports = router;