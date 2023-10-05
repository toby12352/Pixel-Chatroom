// Server (Node.js)
const express = require('express');
const server = require('http').createServer();
const cors = require('cors');
const io = require('socket.io')(server, {
    cors:{
        // For AWS
        // origin:"http://35.91.65.162:3000",

        // For Local
        origin:"http://localhost:3000",
        methods:['GET', 'POST'],
    }
});
const { createMessageTable, insertMessage, getAllMessage, deleteTable }= require('./models/message');

const app = express();
app.use(cors());
const port = 8080;

const connectedUsers = [];

//Create Message Table
createMessageTable();
// deleteTable();

app.get('/chat-history', async(req, res) => {
  try{
    const chatHistory = await getAllMessage();
    console.log(`chatHistory: ${chatHistory}`);
    res.json(chatHistory);
  } catch (err) {
    console.error('Error retrieving chat history:', err);
    res.status(500).json({error: 'Failed to retrieve chat history'});
  }
});


io.on('connection', (socket) => {
  console.log('User connected');

  const username = `User${Math.floor(Math.random() * 1000)}`;

  io.emit('set-username', username);

  connectedUsers[username] = socket;

  socket.on('client-message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('server-message', { username, message });
    insertMessage(username, message);

    getAllMessage((err, results) => {
      if(err) {
        console.error('Error retrieving messages:', err);
      } else {
        const chat = JSON.stringify(results);
        console.log('All Messages:', chat);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete connectedUsers[username];
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});