import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./Chat.css";

const socket = io('http://localhost:3000');

function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      setUsername(userRole);
      socket.emit('join', userRole); // Automatically join the chat
      setIsJoined(true);
    }

    socket.on('private-message', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: data.from, message: data.message },
      ]);
    });

    socket.on('user-list', (userList) => {
      setUsers(userList);
    });

    socket.on('chat-history', (history) => {
      setMessages(history);
    });

    return () => {
      socket.off('private-message');
      socket.off('user-list');
      socket.off('chat-history');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && selectedContact) {
      socket.emit('private-message', {
        from: username,
        to: selectedContact,
        message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: 'You', message },
      ]);
      setMessage('');
    }
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setMessages([]); // Clear previous messages
    socket.emit('get-chat-history', { from: username, to: contact });
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="contact-list">
          <h3>Contacts</h3>
          <ul>
            {['doctor', 'lab-staff', 'nurse']
              .filter(role => role !== username)
              .map((role, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectContact(role)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      role === selectedContact ? '#f0f0f0' : 'transparent',
                  }}
                >
                  {role}
                </li>
              ))}
          </ul>
        </div>

        <div className="chat-box">
          {selectedContact ? (
            <>
              <h2>Chat with {selectedContact}</h2>
              <div className="messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={msg.from === 'You' ? 'sent-message' : 'received-message'}
                  >
                    <strong>{msg.from}: </strong>{msg.message}
                  </div>
                ))}
              </div>

              <div className="input-container">
  <div className="input-wrapper">
    <input
      type="text"
      placeholder="Type a message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
    />
    <button onClick={handleSendMessage}>Send</button>
  </div>
</div>

            </>
          ) : (
            <div>Select a contact to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
