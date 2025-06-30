'use client';
import { useState } from 'react';

interface CommentFormProps {
    postId: string;
    onCommentAdded: (comment: any) => void;
}

export default function CommentForm({
    postId,
    onCommentAdded,
}: CommentFormProps) {
    const [newComment, setNewComment] = useState({ text: '', name: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                onCommentAdded(createdComment);
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
        <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
            <div>
                <input
                    name="name"
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
                    autoComplete="on"
                />
            </div>
            <div>
                <textarea
                    name="text"
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
    );
}
