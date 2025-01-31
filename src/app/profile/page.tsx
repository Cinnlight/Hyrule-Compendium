// app/profile/page.tsx
import styles from "./page.module.css";
import ProfileCard from "../ui/components/profileCard";

export default function Profile() {
    return (
        <main className={styles.profile}>
            <ProfileCard />
        </main>
    );
}