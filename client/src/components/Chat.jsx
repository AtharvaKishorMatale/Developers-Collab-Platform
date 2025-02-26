import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the backend

const Chat = ({ groupId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Join group and fetch previous messages
  useEffect(() => {
    socket.emit("joinGroup", groupId);

    // Listen for previous messages
    socket.on("previousMessages", (previousMessages) => {
      setMessages(previousMessages);
    });

    // Listen for new messages
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
    };
  }, [groupId]);

  // Send message
  const sendMessage = () => {
    if (message.trim()) {
      const messageData = {
        groupId,
        sender: user,
        message,
      };
      socket.emit("sendMessage", messageData);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Group Chat: {groupId}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;