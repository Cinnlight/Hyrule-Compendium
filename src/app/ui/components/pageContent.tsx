// ui/cpmonents/pageContent.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api.js';

interface PageContentProps {
    pageId: number;
}

const PageContent: React.FC<PageContentProps> = ({ pageId }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.get(`/api/content/${pageId}`); //fetch data for selected page
                setData(response.data);
            } catch (err: any) {
                setError('Failed to fetch page');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pageId]);

    return (
        <div>
            <h2>PageContent</h2>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {data && (
                <div>
                    <ul>
                        {data.items?.map((item:any, index: number) =>(
                            <li key={index}>{item.name}</li>    
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default PageContent;
