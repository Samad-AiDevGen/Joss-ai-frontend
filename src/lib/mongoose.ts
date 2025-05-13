// src/lib/mongoose.ts
import mongoose from 'mongoose';

// Check if MongoDB URI is defined
if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI as string;

// Connection state
let isConnected = false;

/**
 * Connect to MongoDB database
 */
async function dbConnect() {
  // If already connected, return
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    // Connect to database
    const db = await mongoose.connect(MONGODB_URI);
    
    // Check if connection was successful
    isConnected = db.connections[0].readyState === 1;
    
    if (isConnected) {
      console.log('MongoDB connected successfully');
    }
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default dbConnect;