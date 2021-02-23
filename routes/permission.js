const express = require('express');
const passport = require('passport');
const router = express.Router();
const Permission = require('../controllers/permission')

router.get('/getPermissions', Permission.getAllPermissions);

router.get('/getPermissionByName', Permission.getPermissionByName);

router.get('/getPermissionById', Permission.getPermissionById);

router.post('/updatePermission', Permission.postUpdatePermission);

router.post('/createPermission', Permission.postCreatePermission);

router.get("/deletePermission", Permission.deletePermission);

module.exports = router;