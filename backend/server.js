import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import http from 'http';
import { Server } from 'socket.io';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import Message from './models/Message.js'; // <--- Added Message Model

// Load environment variables
dotenv.config();

// Check for MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("----------------------------------------------------------------");
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  console.error("Please create a .env file in the 'backend' folder with this variable.");
  console.error("----------------------------------------------------------------");
  process.exit(1);
}

connectDB();

const app = express();

// Use an environment variable for the frontend URL, fallback to localhost for dev
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// --- SOCKET.IO SETUP ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL, // <--- Use the variable
    methods: ["GET", "POST"]
  }
});

// Track active users in memory
let activeUsers = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // --- JOIN ROOM & LOAD HISTORY ---
  socket.on('join_room', async (data) => {
    let roomId = "";

    // Admin joins by sending a simple string (User ID they want to chat with)
    if (typeof data === 'string') {
      roomId = data;
      console.log(`Admin joined room: ${roomId}`);
    
    // Users join by sending an object { userId, userName }
    } else if (data.userId) {
      roomId = data.userId;
      
      // 🟢 FIX: Update socketId if user exists, otherwise push new user
      const existingUserIndex = activeUsers.findIndex((u) => u.userId === data.userId);

      if (existingUserIndex !== -1) {
        // User exists: UPDATE their socketId to the new connection
        activeUsers[existingUserIndex].socketId = socket.id;
        activeUsers[existingUserIndex].userName = data.userName; 
      } else {
        // User does not exist: ADD them
        activeUsers.push({ 
          userId: data.userId, 
          userName: data.userName, 
          socketId: socket.id 
        });
      }
      
      // Broadcast updated active users list to Admin
      io.emit('active_users', activeUsers);
      console.log(`User ${data.userName} joined room: ${roomId}`);
    }

    // Join the socket room
    socket.join(roomId);

    // FETCH OLD MESSAGES FROM DB
    try {
      const history = await Message.find({ room: roomId }).sort({ createdAt: 1 });
      socket.emit('load_messages', history); // Send history to the client who just joined
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  });

  // --- SEND & SAVE MESSAGE ---
  socket.on('send_message', async (data) => {
    // 1. Save to Database
    try {
      const newMessage = new Message({
        room: data.room,
        author: data.author,
        message: data.message,
        isAdmin: data.isAdmin,
        time: data.time
      });
      await newMessage.save();
      
      // 2. Send to Room (Real-time)
      // Broadcast to everyone in the room (including sender if they didn't optimistically update)
      // .to() sends to everyone in room EXCEPT sender, .in() sends to everyone INCLUDING sender
      // Typically frontend handles its own display, so we send to the room for the *other* party.
      socket.to(data.room).emit('receive_message', data);
      
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // --- DISCONNECT ---
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
    
    // 🟢 FIX: Remove user from active list ONLY if the socketId matches
    // This prevents removing a user who has already reconnected on a new socket
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    
    // Update Admin's list
    io.emit('active_users', activeUsers);
  });
});
// -----------------------

// Middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true })); // <--- Use the variable here too
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }
}));

// Routes
app.use('/products', productRoutes);
app.use('/users', authRoutes);
app.use('/orders', orderRoutes);
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));