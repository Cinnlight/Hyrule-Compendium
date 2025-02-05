// app/ui/components/searchbar.tsx
'use client';

import { useState } from 'react';
import api from '../../lib/api';
import { usePageContext } from '../../lib/pageContext';
import { useRouter } from 'next/navigation';

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const { setSelectedPageId } = usePageContext();
    const router = useRouter();

    const handleSearch = async () => {
        try {
            const response = await api.post(`/api/pages/search`, { search: query });
            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <li id="searchBar">
            <input
                id="navSearch" 
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}  // new handler for Enter key
            />
            <button id="navSearchButton" onClick={handleSearch}>
                <span className="material-icons-round">search</span>
            </button>
            {results.length > 0 && (
                <ul>
                    {results.map((page) => (
                        <li key={page.id} onClick={() => {
                            setSelectedPageId(page.id);
                            setResults([]);
                            setQuery("");
                            router.push(`/compendium/page/`);
                        }}>
                            {page.title}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}