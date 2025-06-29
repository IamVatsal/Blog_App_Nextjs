import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Post } from '@/models/post';
import { isValidObjectId } from 'mongoose';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Validate ObjectId format
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { error: 'Invalid post ID format' },
                { status: 400 }
            );
        }

        await dbConnect();
        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const { id } = await params;

        // Validate ObjectId format
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { error: 'Invalid post ID format' },
                { status: 400 }
            );
        }
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }
        await dbConnect();
        // Check if the user is authorized to delete the post
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }
        if (post.email !== session.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized to delete this post' },
                { status: 403 }
            );
        }
        const delPost = await Post.findByIdAndDelete(id);

        if (!delPost) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Post deleted successfully',
            deletedPost: delPost,
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }
        
        const { id } = await params;
        // Validate ObjectId format
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { error: 'Invalid post ID format' },
                { status: 400 }
            );
        }

        await dbConnect();
        const body = await req.json();
         const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }
        if (post.email !== session.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized to Update this post' },
                { status: 403 }
            );
        }

        const updatedPost = await Post.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedPost) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
