'use client';
import { useEffect, useState } from 'react';
import './local.css';
import  MDEditor  from '@uiw/react-md-editor'

type Post = {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    status?: string;
    views?: number;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6">
             <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
                {posts.length === 0 ? (
                    <p className="text-gray-500">No posts available.</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post, index) => (
                            <div
                                key={post._id}
                                className="border border-gray-700 p-4 rounded-lg shadow-sm"
                            >
                                <h3 className="text-lg font-bold mb-2 text-blue-600">
                                    Post #{index + 1} {`_id:${post._id}`}
                                </h3>
                                <h4 className="text-xl font-semibold mb-2">
                                    {post.title}
                                </h4>
                                <MDEditor.Markdown source={post.content} className='rounded w-full pt-1 pb-3 mb-3 mt-1' />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-400">
                                    <p>
                                        <strong>Author:</strong>{' '}
                                        {post.author || 'Anonymous'}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{' '}
                                        {post.status || 'draft'}
                                    </p>
                                    <p>
                                        <strong>Views:</strong>{' '}
                                        {post.views || 0}
                                    </p>
                                    <p>
                                        <strong>Published:</strong>{' '}
                                        {post.isPublished ? 'Yes' : 'No'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400 mt-2">
                                    <p>
                                        <strong>Created:</strong>{' '}
                                        {new Date(
                                            post.createdAt || ''
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Updated:</strong>{' '}
                                        {new Date(
                                            post.updatedAt || ''
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
