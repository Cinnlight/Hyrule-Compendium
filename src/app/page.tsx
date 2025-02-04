//  app/page.tsx
import Image from "next/image";
import styles from "./ui/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hyrule Compendium</h1>
      </main>
      <footer className={styles.footer}>
        FOOTER CONTENT
      </footer>
    </div>
  );
}
