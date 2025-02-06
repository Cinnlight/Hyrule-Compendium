'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../login/page.module.css';

const PasswordResetForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError('Invalid reset token');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/auth/update-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password })
            });

            const data = await response.json();
            if (data.success) {
                router.push('/login');
            } else {
                throw new Error(data.error);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to update password');
        }
    };

    return (
        <div>
            <h1>Set New Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password" className={styles.loginlabel}>
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={styles.logininput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className={styles.loginlabel}>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className={styles.logininput}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className={styles.loginbutton}>
                    Update Password
                </button>
            </form>
        </div>
    );
};

// Wrap the form component with Suspense
const PasswordReset = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PasswordResetForm />
        </Suspense>
    );
};

export default PasswordReset;