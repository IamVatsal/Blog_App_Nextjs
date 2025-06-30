import ServerComments from '@/components/ui/ServerComments';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongoose';
import { Post as PostModel } from '@/models/post';
import PostClientWrapper from '@/components/ui/PostClientWrapper';

// TypeScript interfaces
interface PostDocument {
    _id: {
        toString: () => string;
    };
    title?: string;
    content?: string;
    author?: string;
    email?: string;
    status?: string;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export default async function PostPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams?: Record<string, string | string[] | undefined>;
}) {
    // Get the post ID from the URL
    const { id } = params;

    // Get comment page from search params (default to 1)
    const rawPage = searchParams?.commentPage;
    const commentPage = Array.isArray(rawPage)
        ? parseInt(rawPage[0]!, 10)
        : rawPage
        ? parseInt(rawPage, 10)
        : 1;

    if (!id || typeof id !== 'string') {
        return notFound();
    }

    // Connect to MongoDB
    await dbConnect();

    // Fetch the post data
    try {
        const post = (await PostModel.findById(
            id
        ).lean()) as unknown as PostDocument;

        if (!post) {
            return notFound();
        }

        // Convert MongoDB document to serializable object
        const serializedPost = {
            _id: post._id.toString(),
            title: post.title || '',
            content: post.content || '',
            author: post.author || 'Anonymous',
            email: post.email || '',
            status: post.status || 'draft',
            isPublished: post.isPublished || false,
            createdAt: post.createdAt
                ? new Date(post.createdAt).toISOString()
                : '',
            updatedAt: post.updatedAt
                ? new Date(post.updatedAt).toISOString()
                : '',
        };

        return (
            <div className="max-w-4xl mx-auto p-3 sm:p-4">
                <h1 className="text-center text-4xl font-serif mt-1 mb-8">
                    Post Details
                </h1>

                {/* PostClientWrapper will handle showing the edit form or regular post based on user authentication */}
                <PostClientWrapper post={serializedPost} />

                {/* Use server-side pre-loaded comments with pagination */}
                <ServerComments
                    postId={serializedPost._id}
                    page={commentPage}
                />
            </div>
        );
    } catch (error) {
        console.error('Error fetching post:', error);
        return notFound();
    }
}
