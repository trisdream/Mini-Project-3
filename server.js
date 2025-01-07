const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const zodiacRoutes = require("./routes/zodiacRoutes");
const chatRoutes = require("./routes/chatRoutes");
const birthChartRoutes = require("./routes/birthchartRoutes");

const app = express();

app.use(bodyParser.json());

app.use(userRoutes);
app.use(zodiacRoutes);
app.use(chatRoutes);
app.use(birthChartRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Astrology Chat!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal server error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
