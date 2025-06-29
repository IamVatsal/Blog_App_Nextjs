import mongoose from 'mongoose';

// Check for environment variable and provide fallback for more graceful error handling
const MONGODB_URI = process.env.MONGODB_URI;

// Declare global mongoose cache to prevent multiple connections
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        if (!MONGODB_URI) {
            throw new Error(
                'Please define the MONGODB_URI environment variable inside .env.local'
            );
        }

        cached.promise = mongoose
            .connect(MONGODB_URI, { bufferCommands: false })
            .then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        console.error('Failed to connect to MongoDB:', e);
        throw e;
    }
}

export default dbConnect;
