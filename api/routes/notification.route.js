import express from "express";
import Notification from "../models/notification.model.js";
const router = express.Router();

// Send notification
router.post("/send", async (req, res) => {
  try {
    console.log("noti working......")
    const { recipientId, senderId, postId, message } = req.body;
    const newNotification = new Notification({ recipientId, senderId, postId, message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: "Error sending notification" });
  }
});

// Get notifications
router.get("/get", async (req, res) => {
  try {
    const { recipientId } = req.query;
    const notifications = await Notification.find({ recipientId }).sort({ timestamp: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
});

// Mark notifications as read
router.put("/markAsRead", async (req, res) => {
  try {
    const { recipientId } = req.body;
    await Notification.updateMany({ recipientId, isRead: false }, { isRead: true });
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Error updating notifications" });
  }
});

router.get('/sent/:currentUserId', async (req, res) => {
  try {
      const { currentUserId } = req.params;
      console.log("Received currentUserId:", currentUserId);
      // Ensure currentUserId is provided
      if (!currentUserId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      // Fetch notifications where senderId matches currentUserId
      const notifications = await Notification.find({ senderId: currentUserId }).sort({ timestamp: -1 });

      console.log("Notification Data:", notifications);
      res.status(200).json(notifications);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



// router.get('/', authMiddleware, getTeamRequests);

export default router;