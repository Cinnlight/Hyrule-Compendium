// /compendium/page.tsx
import Categories from '../ui/components/categories';
import ProtectedRoute from "../ui/components/protectedRoute";
import styles from './page.module.css';

export default function Compendium() {
    return (
        <ProtectedRoute>
            <div className={styles.compendiumflex}>
                <h1 className={styles.title}>Compendium</h1>
                <div className={styles.content}>
                    <Categories />
                </div>
            </div>
        </ProtectedRoute>
    );
}