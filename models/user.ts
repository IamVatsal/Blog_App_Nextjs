import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

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

export const User = models.User || model<IUser>('User', UserSchema);
