const express = require("express");
const {
  getAllZodiacSigns,
  getZodiacByName,
} = require("../controllers/zodiacController");

const router = express.Router();

router.get("/zodiacsigns", getAllZodiacSigns);

router.get("/zodiacsigns/:name", getZodiacByName);

module.exports = router;
