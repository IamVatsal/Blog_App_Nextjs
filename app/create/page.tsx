'use client';
import { useEffect, useState } from 'react';
import './local.css';

type Post = {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    status?: string;
    views?: number;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export default function CreatePost() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [postDraft, setPostDraft] = useState<Post>({
        title: '',
        content: '',
        author: '',
        status: 'draft',
        views: 0,
        isPublished: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;

        setPostDraft((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : type === 'number'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!postDraft.title || !postDraft.content) {
            alert('Title and content are required!');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postDraft),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const newPost = await response.json();
            setPosts((prev) => [newPost, ...prev]);

            // Reset form
            setPostDraft({
                title: '',
                content: '',
                author: '',
                status: 'draft',
                views: 0,
                isPublished: false,
            });
            alert('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tableHeader =
        'align-text-top text-left p-4 whitespace-nowrap min-w-32 text-gray-200';
    const inputClass =
        'border border-gray-300 rounded p-2 m-2 text-gray-900 bg-white focus:border-gray-500 focus:outline-none';

    return (
        <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6">
            <h1 className="text-center text-4xl font-serif mt-5 mb-8">Form</h1>
            <form
                onSubmit={handleSubmit}
                className="border drop-shadow-lg rounded-lg p-2 pb-4 pr-4 sm:p-6  border-gray-700"
                suppressHydrationWarning
            >
                <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                            <th className={`${tableHeader} w-1/4`}>Title :</th>
                            <td className="p-2">
                                <input
                                    type="text"
                                    name="title"
                                    value={postDraft.title}
                                    onChange={handleInputChange}
                                    className={`${inputClass} w-full`}
                                    placeholder="Enter Post Title"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className={`${tableHeader} w-1/4`}>
                                Content :
                            </th>
                            <td className="p-2">
                                <textarea
                                    name="content"
                                    value={postDraft.content}
                                    onChange={handleInputChange}
                                    className={`${inputClass} w-full resize-vertical`}
                                    placeholder="Enter Post Content"
                                    required
                                    rows={6}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className={`${tableHeader} w-1/4`}>Author :</th>
                            <td className="p-2">
                                <input
                                    type="text"
                                    name="author"
                                    value={postDraft.author}
                                    onChange={handleInputChange}
                                    className={`${inputClass} w-full`}
                                    placeholder="Enter Author Name"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className={`${tableHeader} w-1/4`}>Status :</th>
                            <td className="p-2">
                                <select
                                    name="status"
                                    className={`${inputClass} w-full`}
                                    value={postDraft.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className={`${tableHeader} w-1/4`}>Views :</th>
                            <td className="p-2">
                                <input
                                    type="number"
                                    name="views"
                                    value={postDraft.views}
                                    onChange={handleInputChange}
                                    className={`${inputClass} w-full`}
                                    placeholder="Enter Number of Views"
                                    min="0"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className={`${tableHeader} w-1/4`}>
                                Published :
                            </th>
                            <td className="p-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="isPublished"
                                        checked={postDraft.isPublished}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 border-gray-300 rounded p-2 m-2 mr-0"
                                    />
                                    <span className="text-gray-300">
                                        Yes, publish this post
                                    </span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="text-right pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    {isSubmitting
                                        ? 'Creating...'
                                        : 'Create Post'}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
                {posts.length === 0 ? (
                    <p className="text-gray-500">No posts available.</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post, index) => (
                            <div
                                key={post._id}
                                className="border border-gray-700 p-4 rounded-lg shadow-sm"
                            >
                                <h3 className="text-lg font-bold mb-2 text-blue-600">
                                    Post #{index + 1}
                                </h3>
                                <h4 className="text-xl font-semibold mb-2">
                                    {post.title}
                                </h4>
                                <p className="whitespace-pre-wrap mb-3 text-gray-300">
                                    {post.content}
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-400">
                                    <p>
                                        <strong>Author:</strong>{' '}
                                        {post.author || 'Anonymous'}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{' '}
                                        {post.status || 'draft'}
                                    </p>
                                    <p>
                                        <strong>Views:</strong>{' '}
                                        {post.views || 0}
                                    </p>
                                    <p>
                                        <strong>Published:</strong>{' '}
                                        {post.isPublished ? 'Yes' : 'No'}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-400 mt-2">
                                    <p>
                                        <strong>Created:</strong>{' '}
                                        {new Date(
                                            post.createdAt || ''
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Updated:</strong>{' '}
                                        {new Date(
                                            post.updatedAt || ''
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
