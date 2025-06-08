import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  members: [
    {
      userId: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      pic: {
        type: String,
        default: ''
      },
      joinedAt: {
        type: Date,
        default: Date.now
      },
      role: {
        type: String,
        enum: ['owner', 'member'],
        default: 'member'
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
export default ChatRoom;
