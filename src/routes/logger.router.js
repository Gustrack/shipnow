const express = require("express");
const loggerController = require("../controllers/logger.controller");
const router = express.Router();

router.get("/test", loggerController.testLogs);

module.exports = router;
