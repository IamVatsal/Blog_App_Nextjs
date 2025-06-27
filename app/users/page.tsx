'use client';

import { useEffect, useState } from 'react';

type User = {
    _id: string;
    name: string;
    email: string;
};

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState({ name: '', email: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);

        fetch('/api/users')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                return res.json();
            })
            .then(setUsers)
            .catch((error) => {
                console.error('Error fetching users:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    const addUser = async () => {
        if (!form.name || !form.email) {
            alert('Please fill in both name and email');
            return;
        }

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error('Failed to add user');
            }

            const newUser: User = await res.json();
            setUsers((prev) => [...prev, newUser]);
            setForm({ name: '', email: '' });
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user');
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Users</h1>

            {!isClient ? (
                <div className="my-4">
                    <p>Loading...</p>
                </div>
            ) : isLoading ? (
                <div className="my-4">
                    <p>Loading users...</p>
                </div>
            ) : (
                <ul className="my-4">
                    {users.length === 0 ? (
                        <li>No users found</li>
                    ) : (
                        users.map((user) => (
                            <li key={user._id}>
                                {user.name} — {user.email}
                            </li>
                        ))
                    )}
                </ul>
            )}

            {isClient && (
                <div className="space-y-2">
                    <input
                        className="border p-2 w-full"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                    <button
                        onClick={addUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add User
                    </button>
                </div>
            )}
        </div>
    );
}
