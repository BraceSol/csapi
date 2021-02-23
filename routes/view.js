const express = require('express');
const passport = require('passport');
const router = express.Router();
const View = require('../controllers/view');
const Validator = require("../services/validator");
router.get("/views", View.getViews);

router.post("/updateView", View.postUpdateViews);

router.get("/removeView", View.getRemoveView);

router.post("/postView", View.postView);

router.get("/viewById", View.getViewById);

module.exports = router;