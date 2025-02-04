// login component
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!login || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Convert what could be display_name to login lowercase and remove whitespace
        // Allowing the user to log in without case sensitivity
        login.toLowerCase().trim();

        try {
            const response = await fetch('/auth/login' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            })
            if (!response.ok) {
                throw new Error('Invalid login credentials');
            }
            const data = await response.json();
            // console.log("login successful", data); // check to see if we need to remove this line upon deployment

            setLogin('');
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
            <form onSubmit={handleSubmit}>
                <div className="login">
                    <label htmlFor="displayName" className="loginlabel">
                        Display Name
                    </label>
                    <input
                        type="displayName"
                        id="displayName"
                        className="loginemail"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="loginbutton" >Login</button>
            </form>
        </div>
    );
};

export default Login;