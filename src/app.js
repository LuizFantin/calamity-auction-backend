// \home\derenash\calamity\src\app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.join(__dirname, '..', '.env.test') });
} else {
  dotenv.config();
}

const sequelize = require('./models');
const authRoutes = require('./routes/auth');
const playerRoutes = require('./routes/players');
const adminRoutes = require('./routes/admin');
const { initializeData } = require('./initialData');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*", // Use environment variable for origin in production
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*", // Use the same origin as Socket.IO
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Add any global socket event listeners here
});

// Apply routes
authRoutes(app, io);
playerRoutes(app, io);
adminRoutes(app, io);

const PORT = process.env.PORT || 3000;

// Don't automatically sync and start server if we're testing
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(async () => {
    await initializeData();
    server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  });
}

module.exports = { app, server, io };  // Export for testing
