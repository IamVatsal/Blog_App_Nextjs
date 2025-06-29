import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // compiler: {
    //     removeConsole: process.env.NODE_ENV === 'production',
    // },
    // experimental: {
    //     optimizeCss: true,
    //     optimizePackageImports: ['@uiw/react-md-editor'],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
