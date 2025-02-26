import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  groupId: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create and export the Message model
const Message = mongoose.model('Message', messageSchema);
export default Message; // Default export