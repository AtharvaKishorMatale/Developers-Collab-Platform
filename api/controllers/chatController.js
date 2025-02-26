import Message from '../models/messageModel.js'; // Import default export

// Save a new message
export const saveMessage = async (groupId, sender, message) => {
  const newMessage = new Message({ groupId, sender, message });
  await newMessage.save();
  return newMessage;
};

// Get all messages for a group
export const getMessages = async (groupId) => {
  return await Message.find({ groupId }).sort({ timestamp: 1 });
};