// A simple script to populate your database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';

dotenv.config();
connectDB();

const products = [
  {
    name: 'Pikachu VMAX',
    image: 'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=1000&auto=format&fit=crop',
    description: 'A rare Pikachu VMAX card.',
    category: 'Pokemon TCG',
    price: 199.99,
    countInStock: 5,
  },
  {
    name: 'Charizard Base Set',
    image: 'https://images.unsplash.com/photo-1601430854328-26d0d524344a?q=80&w=1000&auto=format&fit=crop',
    description: 'The legendary fire type card.',
    category: 'Pokemon TCG',
    price: 499.99,
    countInStock: 2,
  },
  {
    name: 'Ultra Ball',
    image: 'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=1000&auto=format&fit=crop',
    description: 'High quality Ultra Ball replica.',
    category: 'Supplies',
    price: 29.99,
    countInStock: 10,
  },
  {
    name: 'Elite Trainer Box',
    image: 'https://images.unsplash.com/photo-1621562900760-49c7192a953e?q=80&w=1000&auto=format&fit=crop',
    description: 'Includes boosters, sleeves, and dice.',
    category: 'Pokemon TCG',
    price: 49.99,
    countInStock: 20,
  },
  {
    name: 'Card Binder',
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cc416d?q=80&w=1000&auto=format&fit=crop',
    description: 'Leather binder for 360 cards.',
    category: 'Supplies',
    price: 24.99,
    countInStock: 15,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();