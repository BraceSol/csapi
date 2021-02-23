const express = require('express');
const passport = require('passport');
const router = express.Router();
const DocumentCategories = require('../controllers/documentCategories');
const Validator = require("../services/validator");

router.post("/createDocumentCategory", DocumentCategories.postDocumentCategories);

router.post("/updateDocumentCategory", DocumentCategories.postUpdateDocumentCategory);

router.get("/getAllDocumentCategories", DocumentCategories.getAllCategories);

router.get("/getDocumentCategoryById", DocumentCategories.getByDocumentCategoryId);

router.get("/deleteDocumentCategory", DocumentCategories.deleteDocumentCategory);

module.exports = router;