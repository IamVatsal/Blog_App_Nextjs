'use client';
import { useEffect, useState } from 'react';
import Comments from '@/components/Comments';

export default function CommentPage() {
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({
        _id: '685c58641fa725949e4b60b8',
        title: 'For Testing',
        content: 'Write your content here...',
        author: 'Vatsal',
        status: 'draft',
        views: 0,
        isPublished: false,
    });

    return (
        <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6">
            <h1 className="text-2xl font-bold mb-4">Comments Page</h1>
            <p className="text-gray-500">This is the comments page.</p>
            <Comments postId={post._id}></Comments>
        </div>
    );
}
