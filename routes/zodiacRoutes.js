const express = require("express");
const {
  getAllZodiacSigns,
  getZodiacByName,
} = require("../controllers/zodiacController");

const router = express.Router();

router.get("/zodiac-signs", getAllZodiacSigns);

router.get("/zodiac-signs/:name", getZodiacByName);

module.exports = router;
