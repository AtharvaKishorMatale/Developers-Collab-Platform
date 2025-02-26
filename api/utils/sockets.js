const socketIO = require("socket.io");
const chatController = require("../controllers/chatController");

const initializeSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000", // Allow React app to connect
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a group
    socket.on("joinGroup", async (groupId) => {
      socket.join(groupId);
      console.log(`User ${socket.id} joined group ${groupId}`);

      // Fetch previous messages for the group
      const messages = await chatController.getMessages(groupId);
      socket.emit("previousMessages", messages);
    });

    // Send and save message
    socket.on("sendMessage", async (data) => {
      const { groupId, sender, message } = data;
      const newMessage = await chatController.saveMessage(groupId, sender, message);
      io.to(groupId).emit("receiveMessage", newMessage);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;