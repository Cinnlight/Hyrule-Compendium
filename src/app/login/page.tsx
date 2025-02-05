'use client';

import Login from '../ui/components/login';
import Signup from '../ui/components/signup';
import { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);  
  return (
      <main className={styles.login}>
        {showSignup ? <Signup onRegistrationSuccess={() => setShowSignup(false)} /> : <Login />}
        <button className={styles.loginbutton} onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? 'Already have an account? Login!' : "Don't have an account? Register!"}
        </button>
      </main>
  );
}