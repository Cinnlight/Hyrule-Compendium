// ui/components/protecedRoute.tsx
"use client";

import { ComponentType, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const ProtectedRoute = <P extends Object> (WrappedComponent: ComponentType<P>) => {
    const Wrapper = (props: P) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            // Check if user is authenticated
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
            } else {
                setIsAuthenticated(true);
            }
        }, []);

        // If user is authenticated, return the WrappedComponent
        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };
    return Wrapper;
};

export default ProtectedRoute;