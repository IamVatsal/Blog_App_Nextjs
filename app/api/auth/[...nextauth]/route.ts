import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@/lib/mongoose';
import { User } from '@/models/user';

export const authOptions: NextAuthOptions = {
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
            await dbConnect();
            if (account?.provider === 'google') {
                // Type assertion for Google profile
                const googleProfile = profile as { picture?: string };

                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        avatar: googleProfile.picture || user.image, // Use user.image as fallback
                    });
                }
            }
            return true;
        },
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
