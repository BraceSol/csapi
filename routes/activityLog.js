const express = require('express');
const passport = require('passport');
const router = express.Router();
const ActivityLog = require('../controllers/activityLog');
const Validator = require("../services/validator");

router.get("/getActivityLog", ActivityLog.getActivityLogByEntityId);

router.post("/postActivityLog", ActivityLog.postActivityLog);

module.exports = router;