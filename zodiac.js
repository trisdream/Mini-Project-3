const { ZodiacSign } = require("./models");
const sequelize = require("./dbConnect");

const zodiacSigns = [
  {
    name: "Aries",
    start_date: new Date("2024-03-21"),
    end_date: new Date("2024-04-19"),
    element: "Fire",
    quality: "Cardinal",
    ruling_planet: "Mars",
  },
  {
    name: "Taurus",
    start_date: new Date("2024-04-20"),
    end_date: new Date("2024-05-20"),
    element: "Earth",
    quality: "Fixed",
    ruling_planet: "Venus",
  },
  {
    name: "Gemini",
    start_date: new Date("2024-05-21"),
    end_date: new Date("2024-06-20"),
    element: "Air",
    quality: "Mutable",
    ruling_planet: "Mercury",
  },
  {
    name: "Cancer",
    start_date: new Date("2024-06-21"),
    end_date: new Date("2024-07-22"),
    element: "Water",
    quality: "Cardinal",
    ruling_planet: "Moon",
  },
  {
    name: "Leo",
    start_date: new Date("2024-07-23"),
    end_date: new Date("2024-08-22"),
    element: "Fire",
    quality: "Fixed",
    ruling_planet: "Sun",
  },
  {
    name: "Virgo",
    start_date: new Date("2024-08-23"),
    end_date: new Date("2024-09-22"),
    element: "Earth",
    quality: "Mutable",
    ruling_planet: "Mercury",
  },
  {
    name: "Libra",
    start_date: new Date("2024-09-23"),
    end_date: new Date("2024-10-22"),
    element: "Air",
    quality: "Cardinal",
    ruling_planet: "Venus",
  },
  {
    name: "Scorpio",
    start_date: new Date("2024-10-23"),
    end_date: new Date("2024-11-21"),
    element: "Water",
    quality: "Fixed",
    ruling_planet: "Pluto",
  },
  {
    name: "Sagittarius",
    start_date: new Date("2024-11-22"),
    end_date: new Date("2024-12-21"),
    element: "Fire",
    quality: "Mutable",
    ruling_planet: "Jupiter",
  },
  {
    name: "Capricorn",
    start_date: new Date("2024-12-22"),
    end_date: new Date("2025-01-19"),
    element: "Earth",
    quality: "Cardinal",
    ruling_planet: "Saturn",
  },
  {
    name: "Aquarius",
    start_date: new Date("2025-01-20"),
    end_date: new Date("2025-02-18"),
    element: "Air",
    quality: "Fixed",
    ruling_planet: "Uranus",
  },
  {
    name: "Pisces",
    start_date: new Date("2025-02-19"),
    end_date: new Date("2025-03-20"),
    element: "Water",
    quality: "Mutable",
    ruling_planet: "Neptune",
  },
];

const seedZodiacSigns = async () => {
  try {
    const existingZodiacs = await ZodiacSign.findAll();
    if (existingZodiacs.length > 0) {
      console.log("Zodiac signs already exist in the database.");
      return;
    }

    for (const zodiac of zodiacSigns) {
      await ZodiacSign.create(zodiac);
    }
    console.log("Zodiac signs have been seeded into the database!");
  } catch (err) {
    console.error("Error seeding zodiac signs:", err);
  }
};

seedZodiacSigns();
