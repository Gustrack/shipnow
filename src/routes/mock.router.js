const express = require("express");
const mockController = require("../controllers/mock.controller");

const router = express.Router();

router.get("/users", mockController.getMockUsers);
router.post("/seed", mockController.seedData);

module.exports = router;
