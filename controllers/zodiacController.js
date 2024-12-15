const { ZodiacSign } = require("../models");

// Get all zodiac signs
const getAllZodiacSigns = async (req, res) => {
  try {
    const zodiacSigns = await ZodiacSign.findAll();
    res.json(zodiacSigns);
  } catch (err) {
    res.status(500).send("Error fetching zodiac signs");
  }
};

// Get a specific zodiac sign
const getZodiacByName = async (req, res) => {
  const { name } = req.params;
  try {
    const zodiacSign = await ZodiacSign.findOne({ where: { name } });
    if (zodiacSign) {
      res.json(zodiacSign);
    } else {
      res.status(404).send("Zodiac sign not found");
    }
  } catch (err) {
    res.status(500).send("Error fetching zodiac sign");
  }
};

module.exports = { getAllZodiacSigns, getZodiacByName };
