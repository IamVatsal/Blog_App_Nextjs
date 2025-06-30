import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Post } from '@/models/post';
import { auth } from '@/app/auth';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await dbConnect();
    const posts = await Post.find({ isPublished: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Post.countDocuments({ isPublished: true });

    return NextResponse.json({
        posts,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const session = await auth();

        const { title, content, author, status, isPublished } =
            await req.json();

        const userEmail = session?.user?.email || null;

        const newPost = await Post.create({
            title,
            content,
            author,
            email: userEmail, // Use the email from the session
            status,
            isPublished,
        });
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
