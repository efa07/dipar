import  { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css"; // Add your chat styles here

// Connect to Flask-SocketIO backend
const socket = io("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Emit the message to the server
      socket.emit("message", message);
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
