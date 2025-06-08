import express from 'express';
import Notification from '../models/notificationschema.js';
import ChatRoom from '../models/ChatRoom.js';

const router = express.Router();

// Send notification
router.post('/send', async (req, res) => {
  console.log("Running Into Notification Send API)");
  try {
    const {
      recipientId,
      senderId,
      senderUsername,
      senderPic,
      postId,
      postTitle,
      message,
      type,
      status,
    } = req.body;

    const notification = new Notification({
      recipientId,
      senderId,
      senderUsername,
      senderPic,
      postId,
      postTitle,
      message,
      type,
      status,
    });

    await notification.save();
    res.status(201).json({ message: 'Notification sent successfully', notification });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Check if request already exists
router.get('/check/:postId/:userId', async (req, res) => {
  console.log("Running Into Notification check API)");
  try {
    const { postId, userId } = req.params;

    const existingNotification = await Notification.findOne({
      postId,
      senderId: userId,
      type: 'join_request',
      status: { $in: ['pending', 'accepted'] },
    });

    res.json({ exists: !!existingNotification });
  } catch (error) {
    console.error('Error checking notification:', error);
    res.status(500).json({ error: 'Failed to check notification' });
  }
});

// Get notifications for a user
router.get('/:userId', async (req, res) => {
  console.log("Running Into Notification userId API)");
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ recipientId: userId }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Accept join request
router.put('/accept/:notificationId', async (req, res) => {
  console.log("Running Into Notification accept API)");
  try {
    const { notificationId } = req.params;
    const { postId, userId } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: 'accepted' },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    let chatRoom = await ChatRoom.findOne({ postId });

    if (!chatRoom) {
      chatRoom = new ChatRoom({
        postId,
        title: notification.postTitle,
        ownerId: notification.recipientId,
        members: [
          {
            userId: notification.recipientId,
            username: 'Owner', // Update this if you can fetch actual username
            role: 'owner',
          },
        ],
      });
    }

    const isAlreadyMember = chatRoom.members.some((member) => member.userId === userId);

    if (!isAlreadyMember) {
      chatRoom.members.push({
        userId: notification.senderId,
        username: notification.senderUsername,
        pic: notification.senderPic,
        role: 'member',
      });

      await chatRoom.save();
    }

    res.json({ message: 'Request accepted successfully', notification, chatRoom });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Failed to accept request' });
  }
});

// Reject join request
router.put('/reject/:notificationId', async (req, res) => {
  console.log("Running Into Notification reject API)");
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: 'rejected' },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Request rejected successfully', notification });
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).json({ error: 'Failed to reject request' });
  }
});

export default router;
