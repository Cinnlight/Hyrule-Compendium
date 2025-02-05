// user's profile card component
'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';

interface User {
    id: any;
    login: string;
    display_name: string;
    email: string;
    auth_level: number;
    email_val: boolean;
    created_at: string;
    updated_at: string;
    avatar_url: string;
}

export default function ProfileCard({ id }: { id: any }) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Using the getUserById endpoint
                const response = await api.post('/api/users/id', {
                    id,
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Error fetching user profile');
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            {user ? (
                <>
                    <span className="avatar-left">[</span>
                    <img className="avatar" src={user.avatar_url ? user.avatar_url : "./default.gif"} alt={`${user.display_name}'s avatar`} />
                    <span className="avatar-right">]</span>
                    <h1>{user.display_name}'s Profile</h1>
                    <p>
                        {user.email_val ? (
                            <i className="material-icons-round" title="email verified">verified</i>
                        ) : (
                            <i className="material-icons-round" title="email not verified">cancel</i>
                        )}
                    </p>
                    <div className="userDetails">
                        <p>
                            <i className="material-icons-round">
                                email
                            </i>
                            Email: {user.email}
                        </p>
                        <p>
                            <i className="material-icons-round">
                                event
                            </i>
                            Member since: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
}