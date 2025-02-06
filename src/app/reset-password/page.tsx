'use client';

import PasswordReset from '../ui/components/passwordReset';
import styles from '../login/page.module.css';

export default function ResetPasswordPage() {
    return (
        <main className={styles.login}>
            <PasswordReset />
        </main>
    );
}