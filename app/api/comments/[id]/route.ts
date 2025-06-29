import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Comment } from '@/models/comment';

// GET a specific comment
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const comment = await Comment.findById(id).populate('postId', 'text');
        
        if (!comment) {
            return NextResponse.json(
                { error: 'Comment not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(comment);
    } catch (error) {
        console.error('Error fetching comment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// PUT - Update comment likes
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { likes } = await req.json();
        const { id } = await params;

        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { likes },
            { new: true }
        );

        if (!updatedComment) {
            return NextResponse.json(
                { error: 'Comment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedComment);
    } catch (error) {
        console.error('Error updating comment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// DELETE a comment
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await dbConnect();
        const deletedComment = await Comment.findByIdAndDelete(id);
        
        if (!deletedComment) {
            return NextResponse.json(
                { error: 'Comment not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}