'use client';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useSession } from 'next-auth/react';
import './PostForm.css';

type Post = {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    status?: string;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export default function PostForm(post: Post) {
    const { data: session, status } = useSession();
    const [postDraft, setPostDraft] = useState<Post>({
        title: post.title || '',
        content: post.content || 'Write your content here...',
        author: post.author || '',
        status: post.status || 'draft',
        isPublished: post.isPublished || false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!postDraft.title || !postDraft.content) {
            alert('Title and content are required!');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/posts/${post._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postDraft),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            // Reset form
            setPostDraft({
                title: postDraft.title || '',
                content: postDraft.content || 'Write your content here...',
                author: postDraft.author || '',
                status: postDraft.status || 'draft',
                isPublished: postDraft.isPublished || false,
            });

            alert('Post Updated successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to update post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!postDraft.title || !postDraft.content) {
            alert('Title and content are required!');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/posts/${post._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postDraft),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            // Reset form
            setPostDraft({
                title: '',
                content: 'Write your content here...',
                author: session?.user?.name || '',
                status: 'draft',
                isPublished: false,
            });

            alert('Post Deleted successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to update post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMDEditorChange = (value: string | undefined) => {
        setPostDraft((prev) => ({
            ...prev,
            content: value || '',
        }));
    };

    useEffect(() => {
        // Reset the form when the session or post props change
        if (status === 'authenticated') {
            setPostDraft((prev) => ({
                ...prev,
                title: post.title || '',
                content: post.content || 'Write your content here...',
                author: post.author || '',
                status: post.status || 'draft',
                isPublished: post.isPublished || false,
            }));
        }
    }, [
        session,
        status,
        post.title,
        post.content,
        post.author,
        post.status,
        post.isPublished,
    ]);

    const tableHeader =
        'align-text-top text-left p-4 whitespace-nowrap min-w-32 text-gray-200 hidden sm:table-cell';
    const inputClass =
        'border border-gray-600 rounded p-2 m-2 text-gray-100 bg-gray-700 focus:border-blue-400 focus:outline-none placeholder-gray-300';
    return (
        <form
            className="border drop-shadow-lg rounded-lg p-2 pb-4 pr-4 sm:p-6 border-gray-600 bg-gray-800"
            suppressHydrationWarning
        >
            <table className="w-full border-collapse">
                <tbody>
                    <tr>
                        <th className={`${tableHeader} w-1/4`}>
                            <label htmlFor="title">Title :</label>
                        </th>
                        <td className="p-2">
                            <input
                                id="title"
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
                            <label htmlFor="content">Content :</label>
                        </th>
                        <td className="p-2">
                            <MDEditor
                                id="content"
                                value={postDraft.content}
                                onChange={handleMDEditorChange}
                                data-color-mode="dark"
                                height={310}
                                className={`border border-gray-600 rounded p-2 m-2 text-gray-100 w-full bg-gray-700`}
                                preview="edit"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th className={`${tableHeader} w-1/4`}>
                            <label htmlFor="author">Author :</label>
                        </th>
                        <td className="p-2">
                            <input
                                id="author"
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
                        <th className={`${tableHeader} w-1/4`}>
                            <label htmlFor="status">Status :</label>
                        </th>
                        <td className="p-2">
                            <select
                                id="status"
                                name="status"
                                className={`${inputClass} w-full`}
                                value={postDraft.status}
                                onChange={handleInputChange}
                            >
                                <option
                                    value="Select"
                                    className="bg-gray-800 text-gray-100"
                                    disabled
                                >
                                    Select Status
                                </option>
                                <option
                                    value="draft"
                                    className="bg-gray-800 text-gray-100"
                                >
                                    Draft
                                </option>
                                <option
                                    value="published"
                                    className="bg-gray-800 text-gray-100"
                                >
                                    Published
                                </option>
                                <option
                                    value="archived"
                                    className="bg-gray-800 text-gray-100"
                                >
                                    Archived
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th className={`${tableHeader} w-1/4`}>
                            <label htmlFor="isPublished">Published :</label>
                        </th>
                        <td className="p-2">
                            <label className="flex items-center gap-2">
                                <input
                                    id="isPublished"
                                    type="checkbox"
                                    name="isPublished"
                                    checked={postDraft.isPublished}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 border-gray-600 bg-gray-700 rounded p-2 m-2 mr-0"
                                />
                                <span className="text-gray-200">
                                    Yes, publish this post
                                </span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-right pt-6">
                            <div className="flex justify-end gap-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    onClick={handleDelete}
                                    className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 border border-gray-600"
                                >
                                    {isSubmitting
                                        ? 'Deleting...'
                                        : 'Delete Post'}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    onClick={handleUpdate}
                                    className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 border border-gray-600"
                                >
                                    {isSubmitting
                                        ? 'Updating...'
                                        : 'Update Post'}
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
