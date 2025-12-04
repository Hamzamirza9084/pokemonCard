import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // In a real app, use process.env.MONGO_URI. 
    // For this demo, ensure you have a local mongodb running or a cloud URI.
    // If you don't have one, this will fail.
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pokemon_shop');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;