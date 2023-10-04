// Server (Node.js)
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

const connectedUsers = [];

io.on('connection', (socket) => {
  console.log('User connected');

  const username = `User${Math.floor(Math.random() * 1000)}`;

  io.emit('set-username', username);

  connectedUsers[username] = socket;

  socket.on('client-message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('server-message', { username, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete connectedUsers[username];
  });
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});