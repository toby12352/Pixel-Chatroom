// Server (Node.js)
const server = require('http').createServer();
const cors = require('cors');
const io = require('socket.io')(server, {
    cors:{
        // For AWS
        origin:"http://52.34.201.95",

        // For Local
        // origin:"http://localhost:3000",

        methods:['GET', 'POST'],
    }
});

const connectedUsers = [];
const activeUsers = new Set();
let activeUsersCount = 0;

io.on('connection', (socket) => {
  console.log('User connected');

  activeUsersCount++;

  // const username = `User${Math.floor(Math.random() * 1000)}`;
  const adjectives = ['Pixelated', 'Retro', 'Bitmapped', 'Glitchy', '8Bit', 'Neon', 'Sparkly', 'Shiny', 'Digital', 'Virtual', 'Crafty', 'Blocky', 'Cubic', 'Dotty', 'Grid'];
  const nouns = ['Sprite', 'Pixel', 'Avatar', 'Gamer', 'Controller', 'Joystick', 'Bitmap', 'Character', 'Console', 'Glitch', 'PixelHero', 'BitLord', 'Cube', 'Screen', 'PixelKnight'];

  const username = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;

  activeUsers.add(username);

  io.emit('server-message', { username: 'System', message: `${username} has joined the chat.` });
  io.emit('set-username', username);
  io.emit('activeUser-count', activeUsersCount);
  io.emit('activeUser-list', Array.from(activeUsers));

  connectedUsers[username] = socket;

  socket.on('client-message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('server-message', { username, message });
  });

  socket.on('disconnect', () => {
    activeUsersCount--;
    activeUsers.delete(username);

    io.emit('activeUser-list', Array.from(activeUsers));
    io.emit('activeUser-count', activeUsersCount);
    io.emit('server-message', { username: 'System', message: `${username} has left the chat.` });

    console.log('User disconnected');
    delete connectedUsers[username];
  });
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});