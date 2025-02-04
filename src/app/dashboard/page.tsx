// /dashboard/page.tsx

import { Forum } from "next/font/google";
import ProtectedRoute from "../ui/components/protectedRoute";
import Link from 'next/link';


export default function Dashboard() {
    return (
        <ProtectedRoute>
            <h1>Dashboard</h1>
            <Link href="/profile">Profile</Link>
        </ProtectedRoute>
    );
}

