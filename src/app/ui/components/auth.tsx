// ui/components/auth.tsx
"use client";

export default function Auth() {
    const token = localStorage.getItem("token");
    return !!token;   //returns token if it exists, false otherwise
};