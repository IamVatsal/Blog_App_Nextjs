'use client';
import { useSession } from 'next-auth/react';
import Post from '@/components/ui/Post';
import PostForm from '@/components/ui/PostForm';

interface PostProps {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    email?: string;
    status?: string;
    isPublished?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export default function PostClientWrapper({ post }: { post: PostProps }) {
    const { data: session } = useSession();

    // Check if the current user is the author of the post
    const isAuthor = session?.user?.email === post.email;

    // Show PostForm for author, regular Post for others
    return isAuthor ? (
        <PostForm
            _id={post._id}
            title={post.title}
            content={post.content}
            author={post.author}
            status={post.status}
            isPublished={post.isPublished}
            createdAt={post.createdAt ? new Date(post.createdAt) : undefined}
            updatedAt={post.updatedAt ? new Date(post.updatedAt) : undefined}
        />
    ) : (
        <Post
            _id={post._id}
            title={post.title}
            content={post.content}
            author={post.author}
            status={post.status}
            isPublished={post.isPublished}
            createdAt={post.createdAt ? new Date(post.createdAt) : undefined}
            updatedAt={post.updatedAt ? new Date(post.updatedAt) : undefined}
        />
    );
}
