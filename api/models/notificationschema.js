import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipientId: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  senderUsername: {
    type: String,
    required: true
  },
  senderPic: {
    type: String,
    default: ''
  },
  postId: {
    type: String,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['join_request', 'accepted', 'rejected', 'general'],
    default: 'join_request'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  readAt: {
    type: Date,
    default: null
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
