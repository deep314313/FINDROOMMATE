import 'dotenv/config';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import messageRoutes from './routes/messages.js';
import conversationRoutes from './routes/conversations.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __dirname = path.resolve();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    //origin: "https://roommate-t3ww.onrender.com",
    origin: ['http://localhost:5173', 'https://findroommate-e539.vercel.app'],
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);

// Socket.io
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        text,
      });
    }
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
