// ui/components/commentSubmission.tsx
'use client';

import { useState, useEffect } from 'react';

interface Content {
    id: number;
    page_id: string;
    content: string;
    version: number;
}

const PageContent = () => {
    const [selectedPage, setSelectedPage] = useState<string>(''); // Default to page 1
    const [content, setContent] = useState<Content | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch content for the selected page
        const fetchContent = async () => {
            try {
                const response = await fetch(`/api/content/${selectedPage}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch content');
                }

                const data: Content = await response.json();
                setContent(data);
                setError(null); // Clear any previous errors
            } catch (error) {
                setError('Could not fetch content');
                setContent(null);
            }
        };

        fetchContent();
    }, [selectedPage]); // Fetch content whenever the selectedPage changes

    const handlePageSelection = (pageId: string) => {
        setSelectedPage(pageId);
    };

    return (
        <div>
            <h1>Page Content</h1>

            {/* Buttons for selecting different pages */}
            <div>
                <button onClick={() => handlePageSelection(1)}>Page 1</button>
                <button onClick={() => handlePageSelection(2)}>Page 2</button>
                <button onClick={() => handlePageSelection(3)}>Page 3</button>
            </div>

            {/* Conditional rendering based on the fetched content */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {content ? (
                <div>
                    <h2>Content Version {content.version}</h2>
                    <p>{content.content}</p>
                </div>
            ) : (
                <p>Loading content...</p>
            )}
        </div>
    );
};

export default PageContent;