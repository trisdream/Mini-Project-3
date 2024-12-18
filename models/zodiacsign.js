const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

const ZodiacSign = sequelize.define(
  "ZodiacSign",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
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
  },
  {
    validate: {
      validDateRange() {
        if (new Date(this.start_date) > new Date(this.end_date)) {
          throw new Error("Start date must be before end date");
        }
      },
    },
  }
);

module.exports = ZodiacSign;
