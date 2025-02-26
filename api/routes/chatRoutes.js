const express = require("express");
const chatController = require("../controllers/chatController");
const router = express.Router();

// Get all messages for a group
router.get("/messages/:groupId", async (req, res) => {
  try {
    const messages = await chatController.getMessages(req.params.groupId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;