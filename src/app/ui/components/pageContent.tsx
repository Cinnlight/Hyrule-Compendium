// ui/components/pageContent.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { usePageContext } from '../../lib/pageContext';
import styles from '../page.module.css';

const PageContent = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { selectedPageId } = usePageContext();

    useEffect(() => {
        if (!selectedPageId) {
            setData(null);
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.post(`/api/pages/info`, {pageId: selectedPageId});
                setData(response.data);
            } catch (err: any) {
                setError('Failed to fetch page');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedPageId]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {data && (
                <div>
                    <h1 className={styles.title}>{data.title}</h1>
                    <div className={styles.metadata}>
                        <p>Page creation: {new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Last updated: {new Date(data.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Page contributors:{" "}
                            {data.contributors.map((item: any, index: number) => (
                                <span key={index}>{item.display_name}{index < data.contributors.length - 1 ? ', ' : ''}</span>
                            ))}
                        </p>
                    </div>
                    <div className={styles.contents}>
                        <section>
                            {data.contents.map((contentItem: any, index: number) => (
                                <p key={index}>{contentItem.content}</p>
                            ))}
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageContent;