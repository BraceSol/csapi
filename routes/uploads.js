const express = require('express');
const passport = require('passport');
const router = express.Router();
const Uploads = require('../controllers/uploads');
const UploadService = require("../services/uploads")
const Validator = require("../services/validator");

router.post("/upload", UploadService.uploadDocument, Uploads.upload);

router.get("/userUploads", Uploads.fetchUserDocuments);

router.get("/uploads", Uploads.fetchUploads);


module.exports = router;