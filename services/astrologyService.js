const swisseph = require("swisseph");
const { BirthChart } = require("../models");

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

function getZodiacSign(longitude) {
  const signIndex = Math.floor(longitude / 30);
  return zodiacSigns[signIndex];
}

function getAscendant(date, latitude, longitude) {
  const jd = swisseph.swe_julday(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours() + date.getMinutes() / 60
  );

  const ascendantData = swisseph.swe_houses(jd, latitude, longitude, "P");
  if (!ascendantData || typeof ascendantData.ascendant === "undefined") {
    console.error("Error: Ascendant data is missing or malformed.");
    return null;
  }

  const ascendantLongitude = ascendantData.ascendant;
  return getZodiacSign(ascendantLongitude);
}

const planetMapping = {
  sun: swisseph.SE_SUN,
  moon: swisseph.SE_MOON,
  mercury: swisseph.SE_MERCURY,
  venus: swisseph.SE_VENUS,
  mars: swisseph.SE_MARS,
  jupiter: swisseph.SE_JUPITER,
  saturn: swisseph.SE_SATURN,
  uranus: swisseph.SE_URANUS,
  neptune: swisseph.SE_NEPTUNE,
  pluto: swisseph.SE_PLUTO,
};

async function getPlanetaryPositions(date) {
  const jd = swisseph.swe_julday(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours() + date.getMinutes() / 60
  );

  const planets = Object.keys(planetMapping);
  let planetPositions = {};

  for (const planet of planets) {
    const planetData = await swisseph.swe_calc(
      jd,
      planetMapping[planet],
      swisseph.SEFLG_SPEED
    );
    const longitude = planetData.longitude;
    const zodiacSign = getZodiacSign(longitude);

    planetPositions[planet] = {
      longitude: longitude.toFixed(2),
      zodiacSign: zodiacSign,
      distance: planetData.distance.toFixed(2),
    };
  }

  return planetPositions;
}

async function updatePlanetaryPositions(
  user,
  newBirthdate,
  newBirthtime,
  latitude,
  longitude
) {
  const planetPositions = await getPlanetaryPositions(new Date(newBirthdate));
  const ascendant = getAscendant(new Date(newBirthdate), latitude, longitude);

  try {
    let birthChart = await BirthChart.findOne({ where: { userId: user.id } });

    if (!birthChart) {
      console.log("No birth chart found. Creating a new one...");
      birthChart = await BirthChart.create({
        userId: user.id,
        birth_date: newBirthdate,
        birth_time: newBirthtime,
        latitude: latitude,
        longitude: longitude,
      });
    }

    birthChart.sun_zodiac = planetPositions.sun.zodiacSign;
    birthChart.moon_zodiac = planetPositions.moon.zodiacSign;
    birthChart.ascendant_zodiac = ascendant;
    birthChart.mercury_zodiac = planetPositions.mercury.zodiacSign;
    birthChart.venus_zodiac = planetPositions.venus.zodiacSign;
    birthChart.mars_zodiac = planetPositions.mars.zodiacSign;
    birthChart.jupiter_zodiac = planetPositions.jupiter.zodiacSign;
    birthChart.saturn_zodiac = planetPositions.saturn.zodiacSign;
    birthChart.uranus_zodiac = planetPositions.uranus.zodiacSign;
    birthChart.neptune_zodiac = planetPositions.neptune.zodiacSign;
    birthChart.pluto_zodiac = planetPositions.pluto.zodiacSign;

    await birthChart.save();
    console.log(`Birth chart updated for user ${user.id}`);
  } catch (error) {
    console.error(
      "Error updating birth chart for user " + user.id + ": " + error.message
    );
  }
}

module.exports = {
  getZodiacSign,
  getAscendant,
  getPlanetaryPositions,
  updatePlanetaryPositions,
};
