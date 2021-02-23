const express = require('express');
const passport = require('passport');
const router = express.Router();
const DocumentTypeAttribute = require('../controllers/documentTypeAttributes');
const Validator = require("../services/validator");

router.post("/createDocumentTypeAttribute", DocumentTypeAttribute.postDocumentTypeAttribute);

router.post("/updateDocumentTypeAttribute", DocumentTypeAttribute.postUpdateDocumentTypeAttribute);

router.get("/deleteDocumentTypeAttribute", DocumentTypeAttribute.deleteDocumentTypeAttribute);

router.get("/allDocumentTypesAttribute", DocumentTypeAttribute.getAllDocumentTypeAttributes);

router.get("/allAttributesByDocumentTypeId", DocumentTypeAttribute.getAllDocumentTypeAttributesByTypeId);

router.get("/documentTypeAttributeById", DocumentTypeAttribute.getDocumentTypeAttributeById);

module.exports = router;