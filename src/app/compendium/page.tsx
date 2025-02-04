// /compendium/page.tsx
import Categories from '../ui/components/categories';
import ProtectedRoute from "../ui/components/protectedRoute";


const Compendium = () => {
    return (
        <div>
            <h1>Compendium</h1>
            <Categories />
        </div>
    );
}

export default ProtectedRoute(Compendium);