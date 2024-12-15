const Sequelize = require("sequelize");
const sequelize = require("../dbConnect");
const User = require("./user");
const ZodiacSign = require("./zodiacsign.js");
const Chat = require("./chat");

sequelize
  .sync()
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.log("Error syncing database:", err));

module.exports = {
  sequelize,
  User,
  ZodiacSign,
  Chat,
};
