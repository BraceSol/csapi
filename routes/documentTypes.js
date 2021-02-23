const express = require('express');
const passport = require('passport');
const router = express.Router();
const DocumentType = require('../controllers/documentTypes');
const Validator = require("../services/validator");

router.post("/createDocumentType", DocumentType.postDocumentTypes);

router.post("/updateDocumentType", DocumentType.postUpdateDocumentType);

router.get("/deleteDocumentType", DocumentType.getDeleteDocumentType);

router.get("/allDocumentTypes", DocumentType.getAllDocumentTypes);

router.get("/documentTypeById", DocumentType.getDocumentTypeById);

router.get("/documentTypeByCategoryId", DocumentType.getAllDocumentTypesByCategoryId);

router.get("/getExampleDocuments", DocumentType.getExampleDocumentsById);

router.get("/getDocumentReferences", DocumentType.getDocumentReferencesById);

router.get("/getUnusedEmployerDocuments", DocumentType.getUnusedEmployerDocuments);

module.exports = router;