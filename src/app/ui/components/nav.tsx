'use client';

import Link from 'next/link';
import Search from './searchbar';
import React, { useState, useEffect } from 'react';

export default function Nav() {
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  },);

    return (
        <nav>
            <ul>
                <Search />
                <li>
                    <Link
                        href="/"
                    >
                        <span className="material-icons-round">
                            home
                        </span>
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/compendium"
                    >
                        <span className="material-icons-round">
                            travel_explore
                        </span>
                        Compendium
                    </Link>
                </li>
                <li>
                    <Link
                        href="/forum"
                    >
                        <span className="material-icons-round">
                            forum
                        </span>
                        Forum
                    </Link>
                </li>
                {isLoggedIn? (
                <li>
                    <Link
                        href="/profile"
                    >
                        <span className="material-icons-round">
                            settings
                        </span>
                        Profile
                    </Link>
                </li>
                ): (
                <li>
                    <Link
                        href="/login"
                    >
                        <span className="material-icons-round">
                            login
                        </span>
                        Login or Register
                    </Link>
                </li>
                )}
            </ul>
        </nav>
    )
}