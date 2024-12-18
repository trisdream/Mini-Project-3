const Sequelize = require("sequelize");
const sequelize = require("../dbConnect");
const User = require("./user");
const ZodiacSign = require("./zodiacsign");
const Chat = require("./chat");
const BirthChart = require("./birthChart");

sequelize
  .sync({ force: false })
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.error("Error syncing database:", err));

module.exports = {
  sequelize,
  User,
  ZodiacSign,
  Chat,
  BirthChart,
};
