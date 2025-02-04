// /compendium/page.tsx
import Categories from '../ui/components/categories';
import ProtectedRoute from "../ui/components/protectedRoute";


export default function Compendium() {
    return (
        <ProtectedRoute>
            <h1>Compendium</h1>
            <Categories />
        </ProtectedRoute>
    );
}

