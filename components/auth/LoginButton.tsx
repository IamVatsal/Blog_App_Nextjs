'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn('google')}
      className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition-colors"
    >
      Sign in with Google
    </button>
  );
}