// src/app/ui/components/passwordResetRequest.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../login/page.module.css';

interface ResetProps {
    onResetSuccess: () => void;
}

const PasswordResetRequest: React.FC<ResetProps> = ({ onResetSuccess }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (countdown !== null && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            onResetSuccess();
        }
    }, [countdown, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/auth/request-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (data.success) {
                setMessage('If an account exists with this email, you will receive reset instructions.');
                setError('');
                setCountdown(3); // Start 3-second countdown
            } else {
                throw new Error(data.error);
            }
        } catch (err: any) {
            // Mimic server error response for security
            setMessage('If an account exists with this email, you will receive reset instructions.');
            setError('');
            setCountdown(3); // Start 3-second countdown
        }
    };

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className={styles.loginlabel}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={styles.logininput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {message && (
                    <p style={{ color: 'green' }}>
                        {message}
                        {countdown !== null && (
                            <span> Redirecting in {countdown} seconds...</span>
                        )}
                    </p>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className={styles.loginbutton}>
                    Request Reset
                </button>
            </form>
        </div>
    );
};

export default PasswordResetRequest;