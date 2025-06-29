'use client';
import { useState, useEffect } from 'react';

interface Comment {
    _id: string;
    text: string;
    name: string;
    postId: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
}

interface CommentsProps {
    postId: string;
}

export default function Comments({ postId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState({ text: '', name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch comments for this post
    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments?postId=${postId}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.text.trim()) {
            alert('Please enter a comment');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newComment,
                    postId,
                }),
            });

            if (response.ok) {
                const createdComment = await response.json();
                setComments((prev) => [createdComment, ...prev]);
                setNewComment({ text: '', name: '' });
            } else {
                alert('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-8 p-6 border border-gray-600 rounded-lg shadow-sm bg-gray-800">
            <h3 className="text-xl font-bold mb-4 text-gray-100">
                Comments ({comments.length})
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
                <div>
                    <input
                        name='name'
                        type="text"
                        placeholder="Your name (optional)"
                        value={newComment.name}
                        onChange={(e) =>
                            setNewComment((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:border-blue-400 focus:outline-none placeholder-gray-400"
                        autoComplete='on'
                    />
                </div>
                <div>
                    <textarea
                        name='text'
                        placeholder="Write your comment..."
                        value={newComment.text}
                        onChange={(e) =>
                            setNewComment((prev) => ({
                                ...prev,
                                text: e.target.value,
                            }))
                        }
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:border-blue-400 focus:outline-none placeholder-gray-400"
                        rows={3}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50 border border-gray-600"
                >
                    {isSubmitting ? 'Adding...' : 'Add Comment'}
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-gray-400">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="p-4 rounded-lg border border-gray-600 bg-gray-700"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-medium text-gray-200">
                                        {comment.name || 'Anonymous'}
                                    </span>
                                    <span className="text-sm text-gray-400 ml-2">
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-100">{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
