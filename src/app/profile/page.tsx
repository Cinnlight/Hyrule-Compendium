'use client';
// app/profile/page.tsx

import styles from "./page.module.css";
import ProfileCard from "../ui/components/profileCard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
}

export default function Profile() {
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setUserId(decoded.id);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return (
        <main className={styles.profile}>
            {userId ? (
                <ProfileCard id={userId} />
            ) : (
                <p>Loading profile...</p>
            )}
        </main>
    );
}