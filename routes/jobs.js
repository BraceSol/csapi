const express = require('express');
const passport = require('passport');
const router = express.Router();
const Jobs = require('../controllers/jobs');
const Validator = require("../services/validator");
router.get("/jobsByEmployerId", Jobs.getJobsByEmployerId);

router.post("/createJob", Jobs.postJobs)

router.post("/updateJob", Jobs.updateJob)

router.get("/jobById", Jobs.getJobById);

router.get("/deleteJob", Jobs.deleteJob);

module.exports = router;