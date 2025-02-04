// user's profile card component
'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';

interface User {
    display_name: string;
    email: string;
    avatar_url: string;
    email_val: boolean;
    created_at: string;
}

interface Comment {

}

// Profile card component example. need to get correct route and data for each user profile

export default function ProfileCard() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get(`/api/user/:userId/`);
                // take destructured data and save to state
                setUser(data);
            } catch (error){
                    setError('Error fetching user profile');
            }
        };

        fetchUser();
    }, []); // Empty dependancy array mean it runs only once when the component mounts

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            {user ? (
                <>
                    <span className="avatar-left">[</span>
                    <img className="avatar" src="./default.gif" />
                    <span className="avatar-right">]</span>
                    <h1>{user.display_name}'s Profile</h1>
                    <p>
                        <i className="material-icons-round" title="email verified">verified</i> (or <i className="material-icons-round" title="email not verified">cancel</i>)
                    </p>
                    <img src={user.avatar_url} alt={`{user.display_name}'s avatar'`}/>
                    <p>Email: {user.email}</p>
                    <p>Member since: {user.created_at}</p>

                </>
            ) : (
                <p>Loading user Profile...</p>
            )}
        </div>
    );
}