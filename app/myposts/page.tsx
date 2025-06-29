import './local.css';
import Post from '@/components/ui/Post';
import Link from 'next/link';
import dbConnect from '@/lib/mongoose';
import { Post as PostModel } from '@/models/post';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

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

export default async function MyPosts() {
    try {
        // Get user session
        const session = await getServerSession(authOptions);
        
        // Redirect if not authenticated
        if (!session || !session.user?.email) {
            redirect('/posts');
        }
        
        // Connect to the database
        await dbConnect();
        
        // Fetch user's posts directly from the database
        const posts = await PostModel.find({ email: session.user.email })
            .sort({ createdAt: -1 })
            .lean() as any[];

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
                    {serializedPosts.length === 0 ? (
                        <p className="text-gray-400">You haven't created any posts yet.</p>
                    ) : (
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
                                        content={post.content?.slice(0, 200) + '...' || 'No content'}
                                        author={post.author}
                                        status={post.status}
                                        isPublished={post.isPublished}
                                        createdAt={post.createdAt}
                                        updatedAt={post.updatedAt}
                                    />
                                </Link>
                            ))}
                        </div>
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
