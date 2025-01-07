const express = require("express");
const {
  getUserBirthChart,
  getAllBirthCharts,
} = require("../controllers/birthchartController");

const router = express.Router();

router.get("/birthcharts", getAllBirthCharts);

router.get("/birthcharts/:userId", getUserBirthChart);

module.exports = router;
