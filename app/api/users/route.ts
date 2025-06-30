import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Post } from '@/models/post';
import { auth } from '@/app/auth';

export async function GET() {
    await dbConnect();
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const posts = await Post.find({ email: session.user?.email }).sort({
        createdAt: -1,
    });
    return NextResponse.json(posts);
}
