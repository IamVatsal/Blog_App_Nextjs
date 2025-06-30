import './local.css';
import Post from '@/components/ui/Post';
import Link from 'next/link';
import dbConnect from '@/lib/mongoose';
import { Post as PostModel } from '@/models/post';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type PostType = {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    email?: string;
    status?: string;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

// Pagination controls component
function PaginationControls({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    return (
        <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                    key={page}
                    href={`/myposts?page=${page}`}
                    className={`px-4 py-2 rounded-md transition-colors ${
                        currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    {page}
                </Link>
            ))}
        </div>
    );
}

export default async function MyPosts({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
    const pageSize = 5; // Number of posts per page

    try {
        // Get user session
        const session = await auth();

        // Redirect if not authenticated
        if (!session || !session.user?.email) {
            redirect('/posts');
        }

        // Connect to the database
        await dbConnect();

        // Count total user posts for pagination
        const totalPosts = await PostModel.countDocuments({
            email: session.user.email,
        });
        const totalPages = Math.ceil(totalPosts / pageSize);

        // Ensure currentPage is within valid range
        const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));

        // Calculate skip for pagination
        const skip = (validPage - 1) * pageSize;

        // Fetch user's posts with pagination
        const posts = (await PostModel.find({ email: session.user.email })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .lean()) as any[];

        // Convert MongoDB documents to plain objects and serialize _id
        const serializedPosts: PostType[] = posts.map((post) => ({
            _id: post._id?.toString() || '',
            title: post.title || '',
            content: post.content || '',
            author: post.author || 'Anonymous',
            status: post.status || 'draft',
            isPublished: post.isPublished || false,
            createdAt: post.createdAt?.toISOString(),
            updatedAt: post.updatedAt?.toISOString(),
        }));

        return (
            <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6">
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-100">
                        My Posts
                    </h2>
                    {serializedPosts.length === 0 && currentPage === 1 ? (
                        <p className="text-gray-400">
                            You haven't created any posts yet.
                        </p>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {serializedPosts.map((post) => (
                                    <Link
                                        key={post._id}
                                        href={`/posts/${post._id}`}
                                        className="block transform transition hover:scale-[1.01]"
                                    >
                                        <Post
                                            _id={post._id}
                                            title={post.title}
                                            content={
                                                post.content?.slice(0, 200) +
                                                    '...' || 'No content'
                                            }
                                            author={post.author}
                                            status={post.status}
                                            isPublished={post.isPublished}
                                            createdAt={post.createdAt}
                                            updatedAt={post.updatedAt}
                                        />
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <Suspense
                                    fallback={
                                        <div className="mt-8 text-center">
                                            Loading pagination...
                                        </div>
                                    }
                                >
                                    <PaginationControls
                                        currentPage={validPage}
                                        totalPages={totalPages}
                                    />
                                </Suspense>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading user posts:', error);
        return (
            <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6">
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-100">
                        My Posts
                    </h2>
                    <div className="bg-red-900/30 border border-red-800 p-4 rounded-lg text-gray-200">
                        <p>Error loading your posts. Please try again later.</p>
                    </div>
                </div>
            </div>
        );
    }
}
