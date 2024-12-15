const express = require("express");
const {
  getAllZodiacSigns,
  getZodiacByName,
} = require("../controllers/zodiacController");

const router = express.Router();

router.get("/", getAllZodiacSigns);
router.get("/:name", getZodiacByName);

module.exports = router;
