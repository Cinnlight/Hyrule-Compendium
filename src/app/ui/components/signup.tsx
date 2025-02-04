// signin component
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SignupProps {
    onRegistrationSuccess: () => void;
}

const Signup: React.FC<SignupProps> = ({ onRegistrationSuccess }) => {
    const [email, setEmail] = useState<string>('');
    const [display_name, setDisplayName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !display_name) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!passwordRegex.test(password)) {
            setError('Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long');
            return;
        }

        setDisplayName(display_name.trim());
        setEmail(email.trim());

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, display_name }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
 
            const data = await response.json();
            console.log("registration successful", data); // check to see if we need to remove this line upon deployment

            setEmail('');
            setDisplayName('');
            setConfirmPassword('');
            setPassword('');
            setError(null);

            onRegistrationSuccess();

            // Other actions here. (e.g. save token to localStorage, etc.)
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="login">
                    <label htmlFor="email" className="loginlabel">
                        Email
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
                    <label htmlFor="display_name" className="loginlabel">
                        Display Name
                    </label>
                    <input
                        type="text"
                        id="display_name"
                        className="loginemail"
                        value={display_name}
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

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="loginlabel">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="loginpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="loginbutton" >Register</button>
            </form>
        </div>
    );
};

export default Signup;