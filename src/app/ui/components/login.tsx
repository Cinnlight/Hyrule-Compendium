// login component
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [displayName, setDisplayName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!displayName || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('auth/login' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ displayName, password }),
            })
            if (!response.ok) {
                throw new Error('Invalid login credentials');
            }
            const data = await response.json();
            console.log("login successful", data); // check to see if we need to remove this line upon deployment

            setDisplayName('');
            setPassword('');
            setError(null);

            // Other actions here. (e.g. save token to localStorage an navigate to /dashboard.)
            localStorage.setItem('token', data.token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };
    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="login">
                    <label htmlFor="email" className="loginlabel">
                        Display Name:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="loginemail"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your Display Name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="loginlabel">
                        Password
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

                <button type="submit" className="loginbutton" >Login</button>
            </form>
        </div>
    );
};

export default Login;