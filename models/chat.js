const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

const Chat = sequelize.define("Chat", {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 1000],
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["general", "private", "group"]],
    },
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipient_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Chat;
