// /dashboard/page.tsx

import ProtectedRoute from "../ui/components/protectedRoute";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default ProtectedRoute(Dashboard);