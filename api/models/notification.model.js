import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
  recipientId: String,
  senderId: String,
  postId: String,
  message: String,
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});
export default mongoose.model("Notification", NotificationSchema);