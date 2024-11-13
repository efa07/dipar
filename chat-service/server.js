// server.js (backend)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.use(cors());

const client = redis.createClient({
  url: 'redis://localhost:6379'
});

client.connect().catch(console.error);

client.on('connect', () => {
  console.log('Connected to Redis server');
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

let users = []; // To track connected users

// Helper function to generate a unique key for each chat between two users
const getChatKey = (user1, user2) => {
  const sortedUsers = [user1, user2].sort();
  return `chat:${sortedUsers[0]}-${sortedUsers[1]}`;
};

// API to check server status
app.get('/', (req, res) => {
  res.send('Chat server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // User joins the chat with a username
  socket.on('join', async (username) => {
    users.push({ socketId: socket.id, username });
    console.log(`${username} has joined the chat`);

    // Add user to Redis with username as key and socketId as value
    await client.set(username, socket.id);

    // Send the user list to all clients
    io.emit('user-list', users.map(user => user.username));
  });

  // Handle private message
// Inside your server.js (backend)

socket.on('private-message', async (data) => {
  const { from, to, message } = data;
  const chatKey = getChatKey(from, to); // Unique chat key

  // Store the message in Redis under the chat key
  await client.rPush(chatKey, JSON.stringify({ from, message }));

  // Retrieve recipient's socketId from Redis
  const recipientSocketId = await client.get(to);
  if (recipientSocketId) {
    io.to(recipientSocketId).emit('private-message', { from, message });
  }
});


  // Send chat history when a user selects a contact
  socket.on('get-chat-history', async ({ from, to }) => {
    const chatKey = getChatKey(from, to);
    
    // Retrieve the chat history from Redis
    const chatHistory = await client.lRange(chatKey, 0, -1);
    const parsedHistory = chatHistory.map(item => JSON.parse(item));

    // Send chat history back to the client
    socket.emit('chat-history', parsedHistory);
  });

  // Handle user disconnect
  socket.on('disconnect', async () => {
    const userIndex = users.findIndex(user => user.socketId === socket.id);
    if (userIndex !== -1) {
      const username = users[userIndex].username;
      users.splice(userIndex, 1);
      console.log(`${username} disconnected`);

      // Remove user from Redis
      await client.del(username);

      // Send updated user list to all clients
      io.emit('user-list', users.map(user => user.username));
    }
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
