import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

// Connect to Flask-SocketIO backend
const socket = io("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const joinRoom = () => {
    if (room && username) {
      socket.emit("join", { username, room });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && room) {
      socket.emit("message", { room, message });
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="chat-container">
      {/* Room selection */}
      <div className="room-selection">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="chat-input"
        />
        <select
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="chat-select"
        >
          <option value="">Select Room</option>
          <option value="doctor">Doctor</option>
          <option value="lab-staff">Lab Staff</option>
        </select>
        <button onClick={joinRoom} className="chat-join-button">
          Join Room
        </button>
      </div>

      {/* Chat box */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>

      {/* Message form */}
      <form onSubmit={sendMessage} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
