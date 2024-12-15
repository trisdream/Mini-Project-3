const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

const ZodiacSign = sequelize.define("ZodiacSign", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  element: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruling_planet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ZodiacSign;
