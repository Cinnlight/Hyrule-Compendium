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
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedContent, setEditedContent] = useState<string>('');

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

    const handleEditClick = () => {
        //initialize the editedContent with the current page content when entering edit mode
        if (data?.contents.length > 0) {
            setEditedContent(data.contents[0].content);
        }
        setIsEditing(true); // enter editting mode
    }

    const handleSaveClick = async () => {
        if (!data || !selectedPageId) return;

        try {
            const response = await api.post('/api/pages/update', {
                pageId: selectedPageId,
                content: editedContent,
            });

            if (response.status === 200) {
                //update local state with the new content
                setData((prevData: any) => ({
                    ...prevData,
                    contents: [{ ...prevData.contents[0], content: editedContent }],
                }));
                setIsEditing(false); //exit editting mode 
            }
        } catch (err: any) {
            console.error('Failed to update page content:', err);
            setError('Failed to update page content');
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false); //exit editting mode
        //reset editContent to the original content
        if (data?.contents.length > 0) {
            setEditedContent(data.contents[0].content);
        }
    }

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
                            {isEditing ? (
                                    // display editable textarea in editting mode
                                    <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    rows={10}
                                    style={{ width: '100%' }}
                                    />
                            ) :(
                                <p>{data.contents[0].content}</p>
                            )}
                        </section>
                    </div>
                    <div>
                        {isEditing ? (
                            <>
                                <button onClick={handleSaveClick}>Save</button>
                                <button onClick={handleCancelClick}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={handleEditClick}>Edit</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageContent;