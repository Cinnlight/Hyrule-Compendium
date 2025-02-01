// /dashboard/page.tsx

import { Forum } from "next/font/google";
import ProtectedRoute from "../ui/components/protectedRoute";
import Link from 'next/link';


const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link href="/profile">Profile</Link>
        </div>
    );
}

export default ProtectedRoute(Dashboard);