import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Comment } from '@/models/comment';
import { Post } from '@/models/post';

// GET all comments or comments for a specific post
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');
        
        let comments;
        if (postId) {
            // Get comments for a specific post
            comments = await Comment.find({ postId }).sort({ createdAt: -1 });
        } else {
            // Get all comments
            comments = await Comment.find().populate('postId', 'title').sort({ createdAt: -1 });
        }
        
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// POST - Create a new comment
export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { text, name, postId } = await req.json();

        // Validate that the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const newComment = await Comment.create({
            text,
            name: name || 'Anonymous',
            postId,
        });

        // Optionally, add comment ID to the post's comments array
        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment._id } },
            { new: true }
        );

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}