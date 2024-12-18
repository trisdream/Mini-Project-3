const express = require("express");
const { sendMessage, getMessages } = require("../controllers/chatController");

const router = express.Router();

router.post("/messages", sendMessage);

router.get("/messages/:userId", getMessages);

module.exports = router;
