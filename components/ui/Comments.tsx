'use client';
import { useState, useEffect, useCallback } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Comment {
    _id: string;
    text: string;
    name: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
}

interface CommentsProps {
    postId: string;
    initialComments?: Comment[];
    initialTotalPages?: number;
    initialTotalComments?: number;
    initialPage?: number;
}

export default function Comments({
    postId,
    initialComments = [],
    initialTotalPages = 1,
    initialTotalComments = 0,
    initialPage = 1,
}: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [isLoading, setIsLoading] = useState(!initialComments.length);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [totalComments, setTotalComments] = useState(initialTotalComments);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Wrap fetchComments in useCallback
    const fetchComments = useCallback(
        async (page: number) => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `/api/comments?postId=${postId}&page=${page}&limit=5`
                );

                if (response.ok) {
                    const data = await response.json();
                    setComments(data.comments);
                    setTotalPages(data.pagination.totalPages);
                    setTotalComments(data.pagination.totalComments);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setIsLoading(false);
            }
        },
        [postId]
    );

    // If no initial comments were provided or page changes, fetch them client-side
    useEffect(() => {
        if (!initialComments.length || currentPage !== initialPage) {
            fetchComments(currentPage);
        }
    }, [
        currentPage,
        initialComments.length,
        initialPage,
        postId,
        fetchComments,
    ]);

    // Update URL when page changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentPage > 1) {
            params.set('commentPage', currentPage.toString());
        } else {
            params.delete('commentPage');
        }

        // Replace the URL without causing a navigation
        const newUrl = `${pathname}?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
    }, [currentPage, pathname, router, searchParams]);

    // Handle new comment added by CommentForm component
    const handleCommentAdded = (newComment: Comment) => {
        // Add the new comment at the top
        setComments((prevComments) => [newComment, ...prevComments]);
        // Increment total comment count
        setTotalComments((prev) => prev + 1);
        // Potentially update total pages
        setTotalPages(Math.ceil((totalComments + 1) / 5));
        // If we're not on the first page, go to first page to see the new comment
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Pagination component
    const CommentPagination = () => (
        <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                        currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );

    return (
        <div className="mt-8 p-6 border border-gray-600 rounded-lg shadow-sm bg-gray-800">
            <h3 className="text-xl font-bold mb-4 text-gray-100">
                Comments ({totalComments})
            </h3>

            {/* Add Comment Form - Using client component */}
            <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />

            {/* Comments List */}
            <div className="space-y-4 mt-6">
                {isLoading ? (
                    <div className="flex justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : comments.length === 0 ? (
                    <p className="text-gray-400">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    <>
                        {comments.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} />
                        ))}

                        {/* Show pagination if we have more than 1 page */}
                        {totalPages > 1 && <CommentPagination />}
                    </>
                )}
            </div>
        </div>
    );
}
