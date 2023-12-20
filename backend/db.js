import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName:'TaskForge',
    });
    console.log('Connected to database');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
