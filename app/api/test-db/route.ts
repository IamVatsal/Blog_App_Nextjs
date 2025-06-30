import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { User } from '@/models/user';

export async function GET() {
    try {
        console.log('Testing database connection...');

        // Connect to the database
        await dbConnect();
        console.log('Successfully connected to MongoDB');

        // Try to access the User model
        const userCount = await User.countDocuments();
        console.log(`Found ${userCount} users in the database`);

        return NextResponse.json({
            status: 'success',
            message: 'Database connection and User model are working properly',
            userCount,
        });
    } catch (error) {
        console.error('Database test failed:', error);

        // Return detailed error information to help with debugging
        return NextResponse.json(
            {
                status: 'error',
                message: 'Database test failed',
                error:
                    error instanceof Error
                        ? {
                              name: error.name,
                              message: error.message,
                              stack: error.stack,
                          }
                        : String(error),
            },
            { status: 500 }
        );
    }
}
