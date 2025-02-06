'use client';

import { useState, useRef, useEffect } from 'react';
import api from '../../lib/api';
import { usePageContext } from '../../lib/pageContext';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const { setSelectedPageId } = usePageContext();
    const router = useRouter();
    const containerRef = useRef<HTMLLIElement>(null);

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

    // Close modal if clicking outside of the search area
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setResults([]);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Clear modal if search query is empty
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
        }
    }, [query]);

    return (
        <li ref={containerRef} className={styles.searchBar}>
            <input
                id="navSearch" 
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button id="navSearchButton" onClick={handleSearch}>
                <span className="material-icons-round">search</span>
            </button>
            {results.length > 0 && (
                <div className={styles.searchModal}>
                    {results.map((page) => (
                        <button key={page.id} onClick={() => {
                            setSelectedPageId(page.id);
                            setResults([]);
                            setQuery("");
                            router.push(`/compendium/page/`);
                        }}>
                            {page.title}
                        </button>
                    ))}
                </div>
            )}
        </li>
    );
}