'use client';
import { useEffect, useState } from 'react';

type Post = {
    title: string;
    content: string;
    author?: string;
    status?: string;
    views?: number;
    isPublished?: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.title}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Author: {post.author || 'Anonymous'}</p>
                        <p>Status: {post.status || 'draft'}</p>
                        <p>Views: {post.views || 0}</p>
                        <p>Published: {post.isPublished ? 'Yes' : 'No'}</p>
                        <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
                        <p>Updated At: {new Date(post.updatedAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
