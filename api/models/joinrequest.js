import mongoose from 'mongoose';

const joinRequestSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userPic: {
    type: String,
    default: ''
  },
  postTitle: {
    type: String,
    required: true
  },
  postOwnerId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate pending requests
joinRequestSchema.index({ postId: 1, userId: 1, status: 1 }, { unique: true });

export default mongoose.model('JoinRequest', joinRequestSchema);