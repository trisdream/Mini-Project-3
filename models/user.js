const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");
const BirthChart = require("./birthChart");
const {
  getPlanetaryPositions,
  getAscendant,
} = require("../services/astrologyService");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    birthtime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    birthplace: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Refactor `afterCreate` hook with transaction for birth chart creation
User.addHook("afterCreate", async (user, options) => {
  const transaction = await sequelize.transaction();
  try {
    const planetPositions = await getPlanetaryPositions(
      new Date(user.birthdate)
    );
    const ascendantZodiac = await getAscendant(
      new Date(user.birthdate),
      user.latitude,
      user.longitude
    );

    await user.createBirthChart(
      {
        birth_date: user.birthdate,
        birth_time: user.birthtime,
        latitude: user.latitude,
        longitude: user.longitude,
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
      },
      { transaction }
    );

    await transaction.commit();
    console.log(`Birth chart created for user ${user.id}`);
  } catch (error) {
    await transaction.rollback();
    console.error(
      "Error creating birth chart after user creation:",
      error.message
    );
  }
});

User.hasOne(BirthChart, { foreignKey: "userId", onDelete: "CASCADE" });
BirthChart.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
