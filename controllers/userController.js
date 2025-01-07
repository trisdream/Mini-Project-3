const { User } = require("../models");
const { updatePlanetaryPositions } = require("../services/astrologyService");

const handlePlanetaryUpdates = async (
  user,
  birthdate,
  birthtime,
  latitude,
  longitude
) => {
  try {
    await updatePlanetaryPositions(
      user,
      birthdate,
      birthtime,
      latitude,
      longitude
    );
  } catch (error) {
    console.error("Error updating planetary positions:", error.message);
  }
};

const createUser = async (req, res) => {
  const { email, name, birthdate, birthtime, birthplace, latitude, longitude } =
    req.body;

  try {
    const user = await User.create({
      email,
      name,
      birthdate,
      birthtime,
      birthplace,
      latitude,
      longitude,
    });

    console.log("Created user:", user);

    // Handle planetary updates
    await handlePlanetaryUpdates(
      user,
      birthdate,
      birthtime,
      latitude,
      longitude
    );

    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).send("Error creating user");
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).send("Error fetching user");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(404).send("No users found");
    }
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).send("Error fetching users");
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, name, birthdate, birthtime, birthplace, latitude, longitude } =
    req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.email = email || user.email;
    user.name = name || user.name;
    user.birthdate = birthdate || user.birthdate;
    user.birthtime = birthtime || user.birthtime;
    user.birthplace = birthplace || user.birthplace;
    user.latitude = latitude || user.latitude;
    user.longitude = longitude || user.longitude;

    await user.save();

    // Handle planetary updates
    await handlePlanetaryUpdates(
      user,
      birthdate,
      birthtime,
      latitude,
      longitude
    );

    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.destroy();
    res
      .status(200)
      .send(`User with ID ${userId} and associated birth chart deleted`);
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).send("Error deleting user");
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
