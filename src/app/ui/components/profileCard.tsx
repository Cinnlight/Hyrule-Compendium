// user's profile card component
'use client';

import { useEffect, useState } from 'react';

interface User {
    id: number;
    display_name: string;
    email: string;
    avatar_url: string;
}

// Profile card component example. need to get correct route and data for each user profile

export default function ProfileCard() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/user/{display_name}');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // store only necessary fields in state
                setUser(data);
            } catch (error) {
                console.log('Error fetching User:', error);
                setError('Error fetching User');
            }
        };

        fetchUser();
    }, []); // Empty dependancy array mean it runs only once when the component mounts

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            {user ? (
                <>
                    <h1>{user.display_name}'s Profile</h1>
                    <img src={user.avatar_url} alt={`{user.display_name}'s avatar'`}/>
                    <p>Email: {user.email}</p>

                </>
            ) : (
                <p>Loading user Profile...</p>
            )}

            <p>Users page content</p>
        </div>
    );
}