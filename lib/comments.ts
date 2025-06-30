import { Comment as CommentModel } from '@/models/comment';
import dbConnect from '@/lib/mongoose';

interface Comment {
    _id: string;
    text: string;
    name: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
}

interface CommentsPaginated {
    comments: Comment[];
    totalPages: number;
    totalComments: number;
}

async function getComments(
    postId: string,
    page: number = 1,
    limit: number = 5
): Promise<CommentsPaginated> {
    await dbConnect();

    try {
        // Calculate pagination parameters
        const skip = (page - 1) * limit;

        // Get total comments count
        const totalComments = await CommentModel.countDocuments({ postId });
        const totalPages = Math.ceil(totalComments / limit);

        // Get paginated comments
        const comments = (await CommentModel.find({ postId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()) as any[];

        // Serialize comments
        const serializedComments = comments.map((comment) => ({
            _id: comment._id.toString(),
            text: comment.text || '',
            name: comment.name || 'Anonymous',
            postId: comment.postId.toString(),
            createdAt: comment.createdAt
                ? new Date(comment.createdAt).toISOString()
                : new Date().toISOString(),
            updatedAt: comment.updatedAt
                ? new Date(comment.updatedAt).toISOString()
                : new Date().toISOString(),
        }));

        return {
            comments: serializedComments,
            totalPages,
            totalComments,
        };
    } catch (error) {
        console.error('Error fetching comments:', error);
        return {
            comments: [],
            totalPages: 0,
            totalComments: 0,
        };
    }
}

export { getComments };
