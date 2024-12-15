const express = require("express");
const { getUserBirthChart } = require("../controllers/userController");

const router = express.Router();

router.get("/:userId/birthchart", getUserBirthChart);

module.exports = router;
