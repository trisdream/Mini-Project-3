const express = require("express");
const {
  createBirthChart,
  getUserBirthChart,
} = require("../controllers/birthchartController");

const router = express.Router();

router.post("/birthcharts", createBirthChart);

router.get("/birthcharts/:userId", getUserBirthChart);

module.exports = router;
