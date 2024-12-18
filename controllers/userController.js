const { User } = require("../models");

const createUser = async (req, res) => {
  const { email, name, birthdate } = req.body;
  try {
    const user = await User.create({
      email,
      name,
      birthdate,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
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
    console.error(err);
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
    console.error(err);
    res.status(500).send("Error fetching users");
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, name, birthdate } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.email = email || user.email;
    user.name = name || user.name;
    user.birthdate = birthdate || user.birthdate;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
};

module.exports = { createUser, getUserById, getAllUsers, updateUser };
