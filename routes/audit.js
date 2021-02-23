const express = require('express');
const passport = require('passport');
const router = express.Router();
const Audits = require('../controllers/audit');
const Validator = require("../services/validator");

router.post("/postAudit", Audits.postAudits);

router.post("/updateAudit", Audits.postUpdateAudit);

router.get("/deleteAudit", Audits.deleteAudit);

router.get("/getAuditById", Audits.getAuditById);

router.get("/getAudits", Audits.getAllAudits);


module.exports = router;