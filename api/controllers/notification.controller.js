import Notification from '../models/notification.model.js';

export const sendJoinRequest = async (req, res) => {
  const { recipientId, senderId, postId, message } = req.body;

  try {
    const notification = new Notification({
      recipientId,
      senderId,
      postId,
      message,
      isRead: false, // Set to false initially
    });

    await notification.save();
    console.log(notification);
    res.status(200).json({ message: 'Join request sent successfully.' });
  } catch (error) {
    console.error('Error sending join request:', error);
    res.status(500).json({ message: 'Failed to send join request.' });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { recipientId } = req.query;
    console.log("Recipient ID:", recipientId);

    if (!recipientId) {
      return res.status(400).json({ error: 'Recipient ID is required' });
    }

    const notifications = await Notification.find({ recipientId }).sort({ createdAt: -1 });
    console.log("Notifications:", notifications);
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// New controller function to mark notifications as read
export const markNotificationsAsRead = async (req, res) => {
  const { recipientId } = req.body;

  try {
    await Notification.updateMany({ recipientId, isRead: false }, { $set: { isRead: true } });
    res.status(200).json({ message: 'Notifications marked as read.' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ error: 'Failed to mark notifications as read.' });
  }
};
