const { BirthChart } = require("../models");

const getUserBirthChart = async (req, res) => {
  const { userId } = req.params;
  try {
    const birthChart = await BirthChart.findOne({ where: { userId } });
    if (!birthChart) {
      return res.status(404).send("Birth chart not found");
    }
    res.json(birthChart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching birth chart");
  }
};

const getAllBirthCharts = async (req, res) => {
  try {
    const birthCharts = await BirthChart.findAll();
    if (!birthCharts || birthCharts.length === 0) {
      return res.status(404).send("No birth charts found");
    }
    res.json(birthCharts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching birth charts");
  }
};

module.exports = { getUserBirthChart, getAllBirthCharts };
