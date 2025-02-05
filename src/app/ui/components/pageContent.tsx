// ui/components/pageContent.tsx
'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { usePageContext } from '../../lib/pageContext';


const PageContent = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { selectedPageId } = usePageContext(); //get the context value
    //console.log('Test for selectedPageId provider:', selectedPageId); //optional for bugfixing

    useEffect(() => {
        if (!selectedPageId) {
            setData(null);
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            //console.log(`Fetching data for page ${pageId}`); // optional for bugfixing
            try {
                //console.log('Sending pageID:', selectedPageId);
                const response = await api.post(`/api/pages/info`, {pageId: selectedPageId}); //fetch data for selected page
                setData(response.data);
                //console.log(response.data); // optional for bugfixing
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
                    <h1>{data.title}</h1>
                    <div>
                        <p>Page creation: {new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Last updated: {new Date(data.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Page contributers:{""} 
                            {data.contributors.map((item: any, index:number) => (
                                <span key={index}>{item.display_name}</span>
                            ))}
                        </p>
                    </div>
                    <div>
                        <section>{data.contents.map((contentItem: any, index: number) => (
                            <p key={index}>{contentItem.content}</p>
                            ))}
                        </section>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PageContent;
