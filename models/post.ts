import { Schema, Document, model, models } from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    author?: string;
    status?: string;
    isPublished?: boolean;
    comments?: Schema.Types.ObjectId[]; // Array of ObjectIds for comments
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
        isPublished: {
            type: Boolean,
            default: true, // Default boolean
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment', // Reference to the Comment model
            required: false, // Optional field to link to comments
        }]
    },
    {
        timestamps: true,
    }
);

export const Post = models.Post || model<IPost>('Post', PostSchema);
