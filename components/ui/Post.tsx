'use client';
import MDEditor from '@uiw/react-md-editor';
import './Post.css'; // Ensure you have the correct path to your local styles

interface PostProps {
    _id?: string;
    title: string;
    content: string;
    author?: string;
    status?: string;
    isPublished?: boolean;
    createdAt?: string | Date; // Accept both string and Date types
    updatedAt?: string | Date; // Accept both string and Date types
}

export default function Post(props: PostProps) {
    const {
        _id,
        title,
        content,
        author,
        status,
        isPublished,
        createdAt,
        updatedAt,
    } = props;

    return (
        <div
            key={_id}
            className="border border-gray-600 p-4 rounded-lg shadow-sm bg-gray-800"
        >
            <h3 className="text-lg font-bold mb-2 text-blue-400">
                Post #{_id}
            </h3>
            <h4 className="text-xl font-semibold mb-2 text-gray-100">
                {title}
            </h4>
            <MDEditor.Markdown
                source={content}
                className="rounded w-full pt-1 pb-3 mb-3 mt-1 bg-gray-700 text-gray-100"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-300">
                <p>
                    <strong>Author:</strong> {author || 'Anonymous'}
                </p>
                <p>
                    <strong>Status:</strong> {status || 'draft'}
                </p>
                <p>
                    <strong>Published:</strong> {isPublished ? 'Yes' : 'No'}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-300 mt-2">
                <p>
                    <strong>Created:</strong>{' '}
                    {new Date(createdAt || '').toLocaleDateString()}
                </p>
                <p>
                    <strong>Updated:</strong>{' '}
                    {new Date(updatedAt || '').toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
