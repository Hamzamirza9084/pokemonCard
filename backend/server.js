import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

connectDB();

// --- 1. Initialize App FIRST ---
const app = express(); 

// --- 2. Configure Middleware ---
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 3. Session Middleware ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey123',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon_shop',
    ttl: 14 * 24 * 60 * 60 
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

// --- 4. Mount Routes ---
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
app.use('/api/orders', orderRoutes);

// --- 5. Static Uploads Folder (AFTER app is defined) ---
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});