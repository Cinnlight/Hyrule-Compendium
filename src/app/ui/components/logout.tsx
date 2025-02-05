// ui/components/logout.tsx
"use client";

import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/'); // Redirect to home page
        router.refresh(); // Refresh the page
    };

    return (
            <button onClick={handleLogout}>Logout</button>
    )
};

export default Logout;