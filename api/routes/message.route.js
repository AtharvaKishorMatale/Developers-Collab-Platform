import express from "express";
import Message from "../models/messageModel.js";

const router = express.Router();

// Fetch messages for a group
router.get("/:groupId", async (req, res) => {
  try {
    const messages = await Message.find({ groupId: req.params.groupId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Send a message
router.post("/", async (req, res) => {
  try {
    const { groupId, sender, message } = req.body;
    if (!groupId || !sender || !message) return res.status(400).json({ error: "Missing fields" });

    const newMessage = new Message({ groupId, sender, message });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
