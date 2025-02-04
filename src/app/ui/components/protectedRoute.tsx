// ui/components/protecedRoute.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

        useEffect(() => {
            // Check if user is authenticated
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                router.replace('/login');
            } else {
                setIsAuthenticated(true);
            }
        }, []);

        if (isAuthenticated === null) {
            return <p>Loading...</p> //Shows loading message while checking authentication. Can be changed to a spinner or other loading indicator.
        }

        // If user is authenticated, return the WrappedComponent
        return isAuthenticated ? <>{children}</> : null;
    };
