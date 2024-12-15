const express = require("express");
const dotenv = require("dotenv");
const zodiacRoutes = require("./routes/zodiacRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

const app = express();
app.use(express.json());

let dbConnect = require("./dbConnect");

app.use("/api/zodiac", zodiacRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(6666, () => {
  console.log("Server is running on port 6666");
});
