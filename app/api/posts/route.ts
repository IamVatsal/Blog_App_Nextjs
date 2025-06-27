import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Post } from '@/models/post';



export async function GET(req: NextRequest) {
    await dbConnect();
    const posts = await Post.find();
    return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { title, content, author, status, views, isPublished } =
            await req.json();

        const newPost = await Post.create({
            title,
            content,
            author,
            status,
            views,
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
