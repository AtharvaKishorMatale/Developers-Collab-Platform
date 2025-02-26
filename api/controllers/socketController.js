import { saveMessage, getMessages } from './chatController.js';

export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a group
    socket.on('joinGroup', async (groupId) => {
      socket.join(groupId);
      console.log(`User ${socket.id} joined group ${groupId}`);

      // Fetch previous messages for the group
      const messages = await getMessages(groupId);
      socket.emit('previousMessages', messages);
    });

    // Send and save message
    socket.on('sendMessage', async (data) => {
      const { groupId, sender, message } = data;
      const newMessage = await saveMessage(groupId, sender, message);
      io.to(groupId).emit('receiveMessage', newMessage);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};