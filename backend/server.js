import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';       // Required for sessions
import MongoStore from 'connect-mongo';      // Required for storing sessions in MongoDB

// --- SOCKET.IO IMPORTS ---
import http from 'http';
import { Server } from 'socket.io';
// -------------------------

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // FIXED: Correct file path

// Load environment variables
dotenv.config();

// --- DEBUGGING CHECK ---
// This will stop the server immediately if your .env file is missing or empty
if (!process.env.MONGO_URI) {
  console.error("----------------------------------------------------------------");
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  console.error("Please create a .env file in the 'backend' folder with this variable.");
  console.error("----------------------------------------------------------------");
  process.exit(1);
}
// -----------------------

connectDB();

const app = express();

// --- SOCKET.IO SETUP ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins their own room based on ID
  socket.on('join_room', (userId) => {
    socket.join(userId);
    console.log(`User with ID: ${userId} joined room: ${userId}`);
  });

  // Handle sending messages
  socket.on('send_message', (data) => {
    // Send to the specific room (User's ID)
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});
// -----------------------

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- SESSION MIDDLEWARE ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // This is what was failing
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  }
}));
// --------------------------

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes); // FIXED: Mapped to /api/users to match frontend
app.use('/api/orders', orderRoutes);
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));