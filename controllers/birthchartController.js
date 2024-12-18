const { BirthChart, User } = require("../models");
const {
  getPlanetaryPositions,
  getAscendant,
} = require("../services/astrologyService");

const createBirthChart = async (req, res) => {
  const { userId, birth_date, birth_time, latitude, longitude } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const planetPositions = await getPlanetaryPositions(new Date(birth_date));
    const ascendantZodiac = await getAscendant(
      new Date(birth_date),
      latitude,
      longitude
    );

    const birthChart = await BirthChart.create({
      userId,
      birth_date,
      birth_time,
      latitude,
      longitude,
      sun_zodiac: planetPositions.sun.zodiacSign,
      moon_zodiac: planetPositions.moon.zodiacSign,
      ascendant_zodiac: ascendantZodiac,
      mercury_zodiac: planetPositions.mercury.zodiacSign,
      venus_zodiac: planetPositions.venus.zodiacSign,
      mars_zodiac: planetPositions.mars.zodiacSign,
      jupiter_zodiac: planetPositions.jupiter.zodiacSign,
      saturn_zodiac: planetPositions.saturn.zodiacSign,
      uranus_zodiac: planetPositions.uranus.zodiacSign,
      neptune_zodiac: planetPositions.neptune.zodiacSign,
      pluto_zodiac: planetPositions.pluto.zodiacSign,
      north_node_zodiac: planetPositions.north_node.zodiacSign, // Assuming you have this data
      chiron_zodiac: planetPositions.chiron.zodiacSign, // Assuming you have this data
    });

    res.status(201).json(birthChart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating birth chart");
  }
};

const getUserBirthChart = async (req, res) => {
  const { userId } = req.params;
  try {
    const birthChart = await BirthChart.findOne({ where: { userId } });
    if (!birthChart) {
      return res.status(404).send("Birth chart not found");
    }
    res.json(birthChart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching birth chart");
  }
};

module.exports = { createBirthChart, getUserBirthChart };
