import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Comment } from '@/models/comment';
import { Post } from '@/models/post';

// GET all comments or comments for a specific post with pagination
export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '5');

        // Validate pagination params
        const validPage = Math.max(1, page);
        const validLimit = Math.min(20, Math.max(1, limit)); // Ensure limit is between 1 and 20

        // Calculate skip value for pagination
        const skip = (validPage - 1) * validLimit;

        let query = {};

        if (postId) {
            // Set query for specific post
            query = { postId };
        }

        // Count total comments for pagination
        const totalComments = await Comment.countDocuments(query);

        // Get paginated comments
        const comments = await Comment.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(validLimit);

        // Calculate total pages
        const totalPages = Math.ceil(totalComments / validLimit);

        return NextResponse.json({
            comments,
            pagination: {
                currentPage: validPage,
                totalPages,
                totalComments,
                limit: validLimit,
            },
        });
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
