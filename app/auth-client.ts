'use client';

// This file contains only the client-side auth functions
// It does NOT import any server-only modules like mongoose or database models

import {
    signIn as nextAuthSignIn,
    signOut as nextAuthSignOut,
} from 'next-auth/react';

// Re-export the client-side functions with the same API
export const signIn = (provider?: string) => {
    return nextAuthSignIn(provider);
};

export const signOut = () => {
    return nextAuthSignOut();
};
