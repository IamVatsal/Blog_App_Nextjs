import Image from "next/image";
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
                      Or post anonymously - it's your choice! Our platform gives you the freedom to decide.
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
      
      {/* Footer */}
      <footer className="bg-gray-800 mt-auto border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 Blog App, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
