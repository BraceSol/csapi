const express = require('express');
const passport = require('passport');
const router = express.Router();
const Queues = require('../controllers/queue');
const Validator = require("../services/validator");

router.post("/postQueue", Queues.postQueues);

router.post("/updateQueue", Queues.postUpdateQueue);

router.get("/deleteQueue", Queues.deleteQueue);

router.get("/getQueueById", Queues.getQueueById);

router.get("/getQueus", Queues.getAllQueues);

router.post("/changeQueueStatus", Queues.changeQueueStatus);
module.exports = router;