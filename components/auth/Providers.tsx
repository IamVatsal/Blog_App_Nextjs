'use client';

import { SessionProvider } from 'next-auth/react';

// The SessionProvider remains the same with the new NextAuth version
// It's used to provide session context to all child components
export default function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}
