'use client';

import Link from 'next/link';

export default function PostNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-900 text-gray-100 px-4">
      <h2 className="text-4xl font-extrabold mb-4 text-blue-400">404</h2>
      <h1 className="text-2xl font-bold mb-4 text-center">Post Not Found</h1>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        The post you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/posts"
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md transition-colors"
        >
          Back to Posts
        </Link>
        <Link
          href="/create"
          className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white px-6 py-3 rounded-md transition-colors"
        >
          Create New Post
        </Link>
      </div>
    </div>
  );
}