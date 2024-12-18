const swisseph = require("swisseph");

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
  const siderealTime = swisseph.swe_sidtime(jd);

  const ascendantData = swisseph.swe_houses(jd, latitude, longitude, "P");
  const ascendantLongitude = ascendantData.cusp[0];
  return getZodiacSign(ascendantLongitude);
}

function getPlanetaryPositions(date) {
  const jd = swisseph.swe_julday(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours() + date.getMinutes() / 60
  );

  const planets = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto",
  ];

  let planetPositions = {};

  planets.forEach((planet) => {
    const planetData = swisseph.swe_calc(
      jd,
      swisseph.SE_[planet.toUpperCase()],
      swisseph.SEFLG_SPEED
    );
    const longitude = planetData.longitude;
    const zodiacSign = getZodiacSign(longitude);

    planetPositions[planet] = {
      longitude: longitude.toFixed(2),
      zodiacSign: zodiacSign,
      distance: planetData.distance.toFixed(2),
    };
  });

  return planetPositions;
}

module.exports = { getZodiacSign, getAscendant, getPlanetaryPositions };
