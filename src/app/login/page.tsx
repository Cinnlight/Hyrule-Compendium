'use client';

import Login from '../ui/components/login';
import Signup from '../ui/components/signup';
import PasswordResetRequest from '../ui/components/passwordResetRequest';
import { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showReset, setShowReset] = useState(false);
  
  return (
      <main className={styles.login}>
        {showSignup ? (
          <Signup onRegistrationSuccess={() => setShowSignup(false)} />
        ) : showReset ? (
          <PasswordResetRequest onResetSuccess={() => setShowReset(false)} />
        ) : (
          <Login onResetClick={() => setShowReset(true)} />
        )}
        <button 
            className={styles.loginbutton} 
            onClick={() => {
                if (showSignup) {
                    setShowSignup(false);
                } else {
                    setShowSignup(true);
                }
                setShowReset(false);
            }}
        >
            {showSignup ? 'Already have an account? Login!' : "Don't have an account? Register!"}
        </button>
      </main>
  );
}