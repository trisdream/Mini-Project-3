const { Chat } = require("../models");

const sendMessage = async (req, res) => {
  const { type, message, sender_id, recipient_id } = req.body;

  if (!type || !message || !sender_id) {
    return res
      .status(400)
      .send("Message type, content, and sender_id are required.");
  }

  try {
    const chat = await Chat.create({
      type,
      message,
      sender_id,
      recipient_id: type === "private" ? recipient_id : null, // Only assign recipient if it's a private message
    });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).send("Error sending message");
  }
};

const getMessages = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Chat.findAll({
      where: {
        sender_id: userId,
      },
    });
    res.json(messages);
  } catch (err) {
    res.status(500).send("Error fetching messages");
  }
};

module.exports = { sendMessage, getMessages };
