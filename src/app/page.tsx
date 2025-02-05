//  app/page.tsx
'use client';
import { useEffect, useState } from "react";
import styles from "./ui/page.module.css";

interface Page {
  id: number;
  title: string;
  updated_at: string;
}

export default function Home() {
  const [recentPage, setRecentPage] = useState<Page | null>(null);

  useEffect(() => {
    const fetchRecentPage = async () => {
      try {
        const response = await fetch('/api/pages/recent');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setRecentPage(data);
      } catch (error) {
        console.error('Error fetching recent page:', error);
      }
    };

    fetchRecentPage();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hyrule Compendium</h1>
        {recentPage && (
          <section className={styles.recent}>
            <h2>Most Recent Update:</h2>
            <p>
              <strong>{recentPage.title}</strong>
              <br />
              Last updated: {new Date(recentPage.updated_at).toLocaleDateString()}
            </p>
          </section>
        )}
      </main>
      <footer className={styles.footer}>
        Created by <a href="https://github.com/Cinnlight/Hyrule-Compendium" target="_blank"> The Hyrule Compendium Team.</a> Nintendo, Hyrule, and Zelda are trademarks of Nintendo Co., Ltd.
      </footer>
    </div>
  );
}