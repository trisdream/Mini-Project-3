const express = require("express");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/user", createUser);

router.get("/user/:userId", getUserById);

router.get("/user", getAllUsers);

router.put("/user/:userId", updateUser);

router.delete("/user/:userId", deleteUser);

module.exports = router;
