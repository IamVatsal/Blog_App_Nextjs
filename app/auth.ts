import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/mongoose';
import { User } from '@/models/user';

export const {
    handlers,
    auth,
    // Don't export these - they'll be used in client components via next-auth/react
    // signIn,
    // signOut
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // Ensure database connection is established first
                await dbConnect();

                if (account?.provider === 'google' && user.email) {
                    // Type assertion for Google profile
                    const googleProfile = profile as { picture?: string };

                    // Check if user exists in our database
                    const existingUser = await User.findOne({
                        email: user.email,
                    });

                    // Create new user if they don't exist
                    if (!existingUser && user.name) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            avatar: googleProfile.picture || user.image || '', // Use user.image as fallback
                        });
                    }
                }
                return true;
            } catch (error) {
                console.error('Authentication error:', error);
                return false; // Return false to show an error
            }
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
});
