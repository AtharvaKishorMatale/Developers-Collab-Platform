import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  postId: {
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
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  messageType: {
    type: String,
    enum: ['text', 'file', 'image', 'system'],
    default: 'text'
  },
  editedAt: {
    type: Date,
    default: null
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
