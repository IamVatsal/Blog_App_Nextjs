import { Schema, Document, model, models } from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    author?: string;
    status?: string;
    views?: number;
    isPublished?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: {
            type: String,
            required: false,
            default: 'Anonymous', // Simple string default
        },
        status: {
            type: String,
            default: 'draft', // Default status
        },
        views: {
            type: Number,
            default: 0, // Default number
        },
        isPublished: {
            type: Boolean,
            default: true, // Default boolean
        },
    },
    {
        timestamps: true,
    }
);

export const Post = models.Post || model<IPost>('Post', PostSchema);
