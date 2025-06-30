import mongoose, { Schema, Document, models, model } from 'mongoose';

// Define the user interface with required fields
export interface IUser extends Document {
    name: string;
    email: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for the user model
const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        avatar: { type: String, required: false, default: '' },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Add any schema methods or virtuals here if needed

// Define the model - check if it already exists in mongoose models to prevent redefinition
// This is important for Next.js due to hot reloading
export const User =
    mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
