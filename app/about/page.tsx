import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Hero Section */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                    About Me
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Curious builder. Tech explorer. Full-stack problem solver.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="md:col-span-1 flex justify-center mt-6">
                    <div className="relative w-64 h-64 overflow-hidden rounded-full border-4 border-purple-500 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-6xl font-bold text-white">
                            V
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold mb-4 text-gray-100">
                        Vatsal
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Hey there! I&apos;m Vatsal Patel, a 20-year-old Computer
                        Engineering student from Gujarat, India. I&apos;m passionate
                        about creating useful and innovative software that
                        brings real value to people. I love turning ideas into
                        working products using modern tools and a
                        problem-solving mindset.
                    </p>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        I specialize in full-stack web development and enjoy
                        exploring everything from system design to DevOps.
                        Inspired by the spirit of innovation and learning, I&apos;m
                        constantly experimenting, building, and leveling up.
                        Whether it&apos;s a blog platform, or a hardware prototype,
                        I&apos;m all in.
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-100">
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'Next.js',
                                'React',
                                'TypeScript',
                                'Node.js',
                                'MongoDB',
                                'PostgreSQL',
                                'Tailwind CSS',
                                'C',
                                'C++',
                                'Java',
                                'Python',
                            ].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        <Link
                            href="https://github.com/IamVatsal"
                            className="text-gray-300 hover:text-blue-400 transition-colors"
                        >
                            <span className="sr-only">GitHub</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="..."
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="https://linkedin.com/in/vatsal"
                            className="text-gray-300 hover:text-blue-400 transition-colors"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="..." />
                            </svg>
                        </Link>
                        <Link
                            href="https://twitter.com/vatsal"
                            className="text-gray-300 hover:text-blue-400 transition-colors"
                        >
                            <span className="sr-only">Twitter</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="..." />
                            </svg>
                        </Link>
                        <Link
                            href="https://vatsal.dev"
                            className="text-gray-300 hover:text-blue-400 transition-colors"
                        >
                            <span className="sr-only">Portfolio</span>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="..."
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* About Project Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
                    About This Project
                </h2>
                <div className="space-y-6 text-gray-300">
                    <p>
                        This blog platform was crafted with a focus on modern
                        architecture and performance optimization. It leverages
                        Next.js 14&apos;s React Server Components for faster page
                        loads and reduced client-side JavaScript, creating a
                        seamless user experience.
                    </p>
                    <p>
                        The application uses a hybrid rendering approach: server
                        components handle data fetching and initial rendering
                        directly from MongoDB, while client components provide
                        interactive features where needed, offering the perfect
                        balance of performance and user experience.
                    </p>

                    <p>
                        From server-side rendered post listings to optimized
                        comment systems, every aspect of this blog is designed
                        with performance, SEO, and developer experience in mind.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-lg mt-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-100">
                            Key Features
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                Next.js 14 with App Router and React Server
                                Components
                            </li>
                            <li>
                                Hybrid architecture: server-side rendering with
                                client interactivity
                            </li>
                            <li>
                                Direct MongoDB access from server components for
                                optimal performance
                            </li>
                            <li>
                                Optimized comment system with server-side
                                initial loading
                            </li>
                            <li>
                                Smart pagination for posts and comments with
                                optimized loading
                            </li>
                            <li>Responsive design with dark mode UI</li>
                            <li>
                                Secure authentication via NextAuth.js with
                                Google OAuth
                            </li>
                            <li>
                                Full CRUD operations with anonymous posting
                                option
                            </li>
                            <li>Rich content editing with Markdown support</li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg mt-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-100">
                            Performance Optimizations
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                Server Components for reduced client-side
                                JavaScript
                            </li>
                            <li>
                                Smart component splitting for optimal code
                                delivery
                            </li>
                            <li>
                                Efficient database queries using Mongoose lean()
                            </li>
                            <li>
                                Strategic data fetching patterns to minimize
                                loading times
                            </li>
                            <li>
                                Paginated data loading with skip/limit for
                                efficient database queries
                            </li>
                            <li>
                                Optimized MongoDB indexes for faster database
                                operations
                            </li>
                            <li>
                                Proper data caching strategies for repeat
                                visitors
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Contact/CTA Section */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Got an idea, feedback, or opportunity? Feel free to reach
                    out or explore my work further.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="mailto:vatsalpatel0609@gmail.com"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        Email Me
                    </Link>
                    <Link
                        href="/posts"
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                        Read Blog Posts
                    </Link>
                </div>
            </div>
        </div>
    );
}
