import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Chat = ({ groupId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch previous messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${groupId}`);
        if (!response.ok) throw new Error("Failed to fetch messages");

        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [groupId]);

  // Send message
  const sendMessage = async () => {
    if (message.trim()) {
      const messageData = { groupId, sender: user, message };

      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
        });

        if (!response.ok) throw new Error("Failed to send message");

        const newMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessage]); // Update UI
        setMessage(""); // Clear input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      {/* Header - Fixed Height */}
      <header className="p-4 bg-gray-800 text-center text-xl font-bold flex-shrink-0">
        Group Chat: {groupId}
      </header>

      {/* Chat Messages - Flexible Height */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.sender === user
                  ? "bg-blue-600 text-right ml-auto max-w-xs"
                  : "bg-gray-700 text-left mr-auto max-w-xs"
              }`}
            >
              <span className="font-semibold">{msg.sender}:</span> {msg.message}
            </div>
          ))
        )}
      </div>

      {/* Input Field - Fixed Height */}
      <div className="flex p-4 bg-gray-800 flex-shrink-0">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-6 py-3 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// ✅ Adding PropTypes validation
Chat.propTypes = {
  groupId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default Chat;
