'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
    >
      Sign Out
    </button>
  );
}