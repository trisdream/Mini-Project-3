const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

const BirthChart = sequelize.define("BirthChart", {
  birth_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  birth_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false,
    validate: {
      min: -90,
      max: 90,
    },
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: false,
    validate: {
      min: -180,
      max: 180,
    },
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
  north_node_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  chiron_zodiac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = BirthChart;
