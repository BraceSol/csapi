const express = require('express');
const passport = require('passport');
const router = express.Router();
const SystemTable = require('../controllers/systemTables');
const Validator = require("../services/validator");

router.get("/systemTables", SystemTable.getSystemTables);

router.post("/systemTable", SystemTable.postSystemTable)

router.post("/updateSystemTable", SystemTable.postUpdateSystemTable)

router.get("/systemTable", SystemTable.getSystemTable);

router.get("/deleteSystemTable", SystemTable.getDeleteSystemTable);

module.exports = router;