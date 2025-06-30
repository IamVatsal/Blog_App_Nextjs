import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Share Your Thoughts</span>
              <span className="block text-blue-400">No Barriers. No Limits.</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Express yourself freely on our platform where ideas flow without judgment.
              Write, comment, and engage with content that matters to you.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row">
              <Link 
                href="/posts" 
                className="rounded-md bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-500 transition"
              >
                Browse Posts
              </Link>
              <Link 
                href="/create" 
                className="rounded-md bg-gray-700 px-5 py-3 text-base font-medium text-gray-100 hover:bg-gray-600 transition border border-gray-600"
              >
                Create Post
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Features That Empower
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Everything you need to express yourself freely.
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Anonymous Posting */}
            <div className="bg-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition border border-gray-600">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-100">Anonymous Posting</h3>
              <p className="mt-2 text-base text-gray-300">
                Share your thoughts without revealing your identity. Express yourself freely without fear of judgment.
              </p>
            </div>
            
            {/* Interactive Comments */}
            <div className="bg-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition border border-gray-600">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-100">Interactive Comments</h3>
              <p className="mt-2 text-base text-gray-300">
                Engage with other users through comments. Share your perspective and build a community around shared interests.
              </p>
            </div>
            
            {/* Full CRUD Operations */}
            <div className="bg-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition border border-gray-600">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-100">Full Control</h3>
              <p className="mt-2 text-base text-gray-300">
                Create, read, update, and delete your posts. You have complete control over your content.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">How It Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Getting started is easy as 1-2-3.
            </p>
          </div>
          
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col rounded-lg shadow-sm overflow-hidden border border-gray-700">
              <div className="flex-1 bg-gray-800 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white text-lg font-semibold">1</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-100 text-center">Create an Account</h3>
                    <p className="mt-3 text-base text-gray-300 text-center">
                      Or post anonymously - it&apos;s your choice! Our platform gives you the freedom to decide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-lg shadow-sm overflow-hidden border border-gray-700">
              <div className="flex-1 bg-gray-800 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white text-lg font-semibold">2</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-100 text-center">Write Your Post</h3>
                    <p className="mt-3 text-base text-gray-300 text-center">
                      Share your thoughts, ideas, stories, or whatever is on your mind. No limits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col rounded-lg shadow-sm overflow-hidden border border-gray-700">
              <div className="flex-1 bg-gray-800 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white text-lg font-semibold">3</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-100 text-center">Engage with Others</h3>
                    <p className="mt-3 text-base text-gray-300 text-center">
                      Comment on posts, receive feedback, and build connections in a supportive community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/create" 
              className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500"
            >
              Start Writing Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    
    </div>
  );
}
