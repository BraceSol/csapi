const express = require('express');
const passport = require('passport');
const router = express.Router();
const References = require('../controllers/references');
const Validator = require("../services/validator");

router.post("/createReference", References.postReference);

router.post("/updateReference", References.updateReference);

router.get("/getUserReferences", References.getUserReferences);

router.get("/getReferenceById", References.getReferenceById);

router.get("/deleteReference", References.deleteReference);

module.exports = router;