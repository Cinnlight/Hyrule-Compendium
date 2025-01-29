// signin component
'use client';

import { useState } from 'react';

const Signup: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            if (!response.ok) {
                throw new Error('Invalid login credentials');
            }
            const data = await response.json();
            console.log("login successful", data); // check to see if we need to remove this line upon deployment

            setEmail('');
            setPassword('');
            setError(null);

            // Other actions here. (e.g. save token to localStorage, etc.)
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };
    return (
        <div className="login">
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="login">
                    <label htmlFor="email" className="loginlabel">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="loginemail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="loginlabel">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="loginpassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className="loginbutton" >Register</button>
            </form>
        </div>
    );
};

export default Signup;