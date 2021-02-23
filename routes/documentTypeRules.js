const express = require('express');
const passport = require('passport');
const router = express.Router();
const DocumentTypeRule = require('../controllers/documentTypeRules');
const Validator = require("../services/validator");

router.post("/createDocumentTypeRule", DocumentTypeRule.postDocumentTypeRule);

router.post("/updateDocumentTypeRule", DocumentTypeRule.updateDocumentTypeRule);

router.get("/deleteDocumentTypeRule", DocumentTypeRule.deleteDocumentTypeRule);

router.get("/allDocumentTypeRule", DocumentTypeRule.getAllDocumentTypeRules);

router.get("/rulesByDocumentType", DocumentTypeRule.getAllDocumentTypeRulesByDocumentType);

router.get("/documentTypeRuleById", DocumentTypeRule.getDocumentTypeRuleById);

module.exports = router;