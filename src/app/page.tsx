//  app/page.tsx
import styles from "./ui/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hyrule Compendium</h1>
      </main>
      <footer className={styles.footer}>
        Created by <a href="https://github.com/Cinnlight/Hyrule-Compendium" target="_blank"> The Hyrule Compendium Team.</a> Nintendo, Hyrule, and Zelda are trademarks of Nintendo Co., Ltd.
      </footer>
    </div>
  );
}
