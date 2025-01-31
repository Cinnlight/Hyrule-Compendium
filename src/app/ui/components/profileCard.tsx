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

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await fetch(`/api/user/1`);

    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             const data = await response.json();

    //             // store only necessary fields in state
    //             setUser(data);
    //         } catch (error) {
    //             console.log('Error fetching User:', error);
    //             setError('Error fetching User');
    //         }
    //     };

    //     fetchUser();
    // }, []); // Empty dependancy array mean it runs only once when the component mounts

    // if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <span className="avatar-left">[</span>
            <img className="avatar" src="./default.gif" />
            <span className="avatar-right">]</span>
            <h1>[userData.name]'s Profile</h1>
            <p>
                <i className="material-icons-round" title="email verified">verified</i> (or <i className="material-icons-round" title="email not verified">cancel</i>)
            </p>
            {/* {user ? (
                <>
                    <h1>{user.display_name}'s Profile</h1>
                    <img src={user.avatar_url} alt={`{user.display_name}'s avatar'`}/>
                    <p>Email: {user.email}</p>

                </>
            ) : (
                <p>Loading user Profile...</p>
            )}

            <p>Users page content</p> */}
        </div>
    );
}