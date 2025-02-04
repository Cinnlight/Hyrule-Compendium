// ui/components/auth.tsx
"use client";

export default function Auth() {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem("token");
        return !!token;
    }
    return false;
}