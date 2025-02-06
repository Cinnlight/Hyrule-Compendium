// app/page.tsx
'use client';
import { useEffect, useState } from "react";
import styles from "./ui/page.module.css";

interface ContentContributor {
  id: string;
  display_name: string;
  ContentContributors: {
    user_id: string;
    content_id: string;
  };
}

interface Content {
  id: string;
  content: string;
  version: number;
  created_at: string;
  updated_at: string;
  contributors: ContentContributor[];
}

interface Comment {
  id: string;
  comment: string;
  created_at: string;
  User: {
    display_name: string;
  };
}

interface PageData {
  title: string;
  created_at: string;
  updated_at: string;
  contributors: ContentContributor[];
  comments: Comment[];
  contents: Content[];
}

export default function Home() {
  const [pageData, setPageData] = useState<PageData | null>(null);

  useEffect(() => {
    const fetchRecentPage = async () => {
      try {
        const response = await fetch('/api/pages/recent');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPageData(data);
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
        {pageData && (
          <section className={styles.content}>
            <div className={styles.metadata}>
              <h2>{pageData.title}</h2>
              <p>Page creation: {new Date(pageData.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}</p>
              <p>Last updated: {new Date(pageData.updated_at).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}</p>
              <p>Page contributors:{' '}
                {pageData.contributors.map((contributor, index) => (
                  <span key={contributor.id}>
                    {index > 0 ? ', ' : ''}
                    {contributor.display_name}
                  </span>
                ))}
              </p>
            </div>

            <div className={styles.contents}>
              {pageData.contents.map((content) => (
                <p key={content.id}>{content.content}</p>
              ))}
            </div>

            <div className={styles.comments}>
              <h2>Comments</h2>
              {pageData.comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <p>{comment.comment}</p>
                  <small>
                    - {comment.User.display_name} ({new Date(comment.created_at).toLocaleDateString()})
                  </small>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <footer className={styles.footer}>
        Created by <a href="https://github.com/Cinnlight/Hyrule-Compendium" target="_blank" rel="noopener noreferrer">
          The Hyrule Compendium Team
        </a>
        Nintendo, Hyrule, and Zelda are trademarks of Nintendo Co., Ltd.
      </footer>
    </div>
  );
}