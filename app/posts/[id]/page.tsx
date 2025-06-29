'use client';
import { useEffect, useState, use } from 'react';
import Comments from '@/components/ui/Comments';
import { NextApiRequest } from 'next';
import Post from '@/components/ui/Post';

type IPost = {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    status?: string;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export default function CommentPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const { id } = use(params);
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState<IPost>({
        _id: '',
        title: '',
        content: '',
        author: '',
        status: 'draft',
        isPublished: false,
    });

    useEffect(() => {
        // Fetch the post data when the component mounts
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto p-3 sm:p-4">
            <h1 className="text-center text-4xl font-serif mt-1 mb-8">Post Details</h1>
            <Post
                _id={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
                status={post.status}
                isPublished={post.isPublished}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
            />
            <Comments postId={post._id || ''}></Comments>
        </div>
    );
}
