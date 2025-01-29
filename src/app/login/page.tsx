'use client';

import Login from '../ui/components/login';
import Signup from '../ui/components/signup';
import { useState } from 'react';
import './page.module.css';

export default function LoginPage() {
    const [showSignup, setShowSignup] = useState(false);  
    return (
        <main>
          {showSignup? <Signup />: <Login />}
          <button onClick={() => setShowSignup(!showSignup)}>
            {showSignup? 'Already have an account? Login': "Don't have an account? Sign up"}
          </button>
        </main>
    );
}