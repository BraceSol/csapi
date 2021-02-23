const express = require('express');
const passport = require('passport');
const router = express.Router();
const Role = require('../controllers/role');
const Validator = require("../services/validator");
router.get("/roles", Role.getRoles);

router.post("/updateRole", Role.postUpdateRoles);

router.get("/removeRole", Role.getRemoveRole);

router.post("/postRole", Role.postRole);

router.get("/roleById", Role.getRoleById);

module.exports = router;