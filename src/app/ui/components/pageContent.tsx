// ui/components/pageContent.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api.js';
import { usePageContext } from '../../lib/pageContext.js';


const PageContent = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { selectedPageId } = usePageContext(); //get the context value
    console.log(selectedPageId);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            //console.log(`Fetching data for page ${pageId}`); // optional for bugfixing
            try {
                console.log('Sending pageID:', selectedPageId);
                const response = await api.post(`/api/pages/info`, {pageID: selectedPageId}); //fetch data for selected page
                setData(response.data);
                console.log(response.data); // optional for bugfixing
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
