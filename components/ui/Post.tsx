'use client';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './Post.css'; // Ensure you have the correct path to your local styles

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

export default function Post(post: Post) {
    return (
        <div
            key={post._id}
            className="border border-gray-600 p-4 rounded-lg shadow-sm bg-gray-800"
        >
            <h3 className="text-lg font-bold mb-2 text-blue-400">
                Post #{post._id}
            </h3>
            <h4 className="text-xl font-semibold mb-2 text-gray-100">
                {post.title}
            </h4>
            <MDEditor.Markdown
                source={post.content}
                className="rounded w-full pt-1 pb-3 mb-3 mt-1 bg-gray-700 text-gray-100"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-300">
                <p>
                    <strong>Author:</strong> {post.author || 'Anonymous'}
                </p>
                <p>
                    <strong>Status:</strong> {post.status || 'draft'}
                </p>
                <p>
                    <strong>Published:</strong>{' '}
                    {post.isPublished ? 'Yes' : 'No'}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-300 mt-2">
                <p>
                    <strong>Created:</strong>{' '}
                    {new Date(post.createdAt || '').toLocaleDateString()}
                </p>
                <p>
                    <strong>Updated:</strong>{' '}
                    {new Date(post.updatedAt || '').toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
