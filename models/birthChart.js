const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

const BirthChart = sequelize.define("BirthChart", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },

  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  birth_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  sun_zodiac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moon_zodiac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ascendant_zodiac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mercury_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  venus_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mars_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jupiter_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  saturn_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  uranus_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  neptune_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pluto_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = BirthChart;
