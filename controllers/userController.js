const { User, ZodiacSign } = require("../models");

const getZodiacSignByBirthdate = async (birthdate) => {
  try {
    const userDate = new Date(birthdate);

    const zodiacSigns = await ZodiacSign.findAll();

    for (const zodiac of zodiacSigns) {
      const startDate = new Date(zodiac.start_date);
      const endDate = new Date(zodiac.end_date);

      if (userDate >= startDate && userDate <= endDate) {
        return zodiac;
      }
    }

    return null;
  } catch (err) {
    console.error("Error determining zodiac sign:", err);
    throw new Error("Error determining zodiac sign");
  }
};

// Get user's birth chart based on their birthdate
const getUserBirthChart = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const zodiacSign = await getZodiacSignByBirthdate(user.birthdate);

    if (!zodiacSign) {
      return res
        .status(404)
        .send("Zodiac sign not found for the user's birthdate");
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        birthdate: user.birthdate,
      },
      birthChart: {
        zodiacSign: zodiacSign.name,
        dates: zodiacSign.dates,
        element: zodiacSign.element,
        quality: zodiacSign.quality,
        rulingPlanet: zodiacSign.ruling_planet,
      },
    });
  } catch (err) {
    console.error("Error fetching birth chart:", err);
    res.status(500).send("Error fetching birth chart");
  }
};

module.exports = { getUserBirthChart };
