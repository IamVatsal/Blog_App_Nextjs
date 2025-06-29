'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoginButton from '@/components/auth/LoginButton';
import LogoutButton from '@/components/auth/LogoutButton';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/posts', label: 'Posts' },
        { href: '/create', label: 'Create Post' },
        { href: '/about', label: 'About' },
        ...(status === 'authenticated' ? [{ href: '/myposts', label: 'My Posts' }] : [])
    ];

    const isActive = (path: string) => {
        return pathname === path
            ? 'font-bold text-blue-400'
            : 'text-gray-300 hover:text-blue-400';
    };

    // Get profile image directly from session
    const profileImg = session?.user?.image || '/default-profile.png';

    return (
        <nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex-shrink-0 flex items-center"
                        >
                            <span className="text-xl font-bold text-blue-400">
                                MyBlog
                            </span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${isActive(
                                    link.href
                                )} transition-colors duration-200 text-sm font-medium`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {status === 'authenticated' ? (
                            <div className="flex items-center gap-4">
                                <span className="text-gray-300 text-sm">
                                    Hi, {session.user?.name?.split(' ')[0]}
                                </span>
                                <div className="h-8 w-8 rounded-full overflow-hidden">
                                    <Image
                                        src={profileImg}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <LogoutButton />
                            </div>
                        ) : (
                            <LoginButton />
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-700 focus:outline-none"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg
                                className={`${
                                    isOpen ? 'hidden' : 'block'
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg
                                className={`${
                                    isOpen ? 'block' : 'hidden'
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } md:hidden bg-gray-800`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`${isActive(
                                link.href
                            )} block px-3 py-2 rounded-md text-base font-medium`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {status === 'authenticated' ? (
                        <div className="px-3 py-2">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-8 w-8 rounded-full overflow-hidden">
                                    <Image
                                        src={profileImg}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="text-base text-gray-300">
                                    {session.user?.email}
                                </div>
                            </div>
                            <LogoutButton />
                        </div>
                    ) : (
                        <div className="px-3 py-2">
                            <LoginButton />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export async function getServerSideProps() {
    return [];
}