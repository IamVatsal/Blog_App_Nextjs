import { Schema, Document, model, models } from 'mongoose';

export interface IComment extends Document {
    text: string;
    name: string;
    postId: Schema.Types.ObjectId; // Optional field to link to a post
    likes?: number;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
    {
        text: { type: String, required: true },
        name: {
            type: String,
            required: false,
            default: 'Anonymous', // Simple string default
        },
        likes: {
            type: Number,
            default: 0, // Default number
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post', // Reference to the Post model
            required: false, // Optional field to link to a post
        },
    },
    {
        timestamps: true,
    }
);

export const Comment = models.Comment || model<IComment>('Comment', CommentSchema);
