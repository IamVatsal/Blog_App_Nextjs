import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Providers from '@/components/auth/Providers';
import Footer from '@/components/ui/Footer';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Bolg App',
    description: 'My Blog App By Vatsal',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100 flex flex-col min-h-screen`}
            >
                <Providers>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                </Providers>
                <Footer />
            </body>
        </html>
    );
}
