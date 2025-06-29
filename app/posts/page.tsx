'use client';
import { useEffect, useState } from 'react';
import './local.css';
import MDEditor from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';
import Post from '@/components/ui/Post';

type Post = {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    status?: string;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    const handlePostClick = (postId: string) => {
        // Alternatively, you can use a router if you're using Next.js
        router.push(`/posts/${postId}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6">
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    Recent Posts
                </h2>
                {posts.length === 0 ? (
                    <p className="text-gray-400">No posts available.</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                onClick={() => handlePostClick(post._id || '')}
                            >
                                <Post
                                    _id={post._id}
                                    title={post.title}
                                    content={post.content.slice(0, 200) + '...'}
                                    author={post.author}
                                    status={post.status}
                                    isPublished={post.isPublished}
                                    createdAt={post.createdAt}
                                    updatedAt={post.updatedAt}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
