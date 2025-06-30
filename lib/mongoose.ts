import mongoose from 'mongoose';

// Check for environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Configuration object
const options = {
    bufferCommands: false,
    autoIndex: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000, // 5 seconds
    socketTimeoutMS: 45000, // 45 seconds
};

// Global mongoose cache for connection reuse
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // If connection exists, reuse it
    if (cached.conn) return cached.conn;

    // Validate MongoDB URI
    if (!MONGODB_URI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.local'
        );
    }

    // Create connection promise if it doesn't exist
    if (!cached.promise) {
        try {
            cached.promise = mongoose
                .connect(MONGODB_URI, options)
                .then((mongoose) => {
                    console.log('MongoDB connected successfully');
                    return mongoose;
                });
        } catch (e) {
            cached.promise = null;
            console.error('Failed to create MongoDB connection promise:', e);
            throw e;
        }
    }

    // Wait for connection to be established
    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        cached.promise = null; // Reset promise on error
        console.error('MongoDB connection error:', e);
        throw e;
    }
}

export default dbConnect;
