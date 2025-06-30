import CommentsClient from './Comments';
import { getComments } from '@/lib/comments';

interface ServerCommentsProps {
    postId: string;
    page?: number;
}

export default async function CommentsWithData({
    postId,
    page = 1,
}: ServerCommentsProps) {
    // Pre-fetch comments on the server with pagination
    const { comments, totalPages, totalComments } = await getComments(
        postId,
        page,
        5
    );

    // Pass initial data and pagination info to the client component
    return (
        <CommentsClient
            postId={postId}
            initialComments={comments}
            initialTotalPages={totalPages}
            initialTotalComments={totalComments}
            initialPage={page}
        />
    );
}
