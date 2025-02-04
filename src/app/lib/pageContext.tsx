// lib/pageContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PageContextType {
    selectedPageId: number;
    setSelectedPageId: (pageId: number) => void;
}

// define the context
const PageContext = createContext<PageContextType | undefined>(undefined);

// define the provider
export const PageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedPageId, setSelectedPageId] = useState<number>(0);

    return (
        <PageContext.Provider value={{ selectedPageId, setSelectedPageId }}>
            {children}
        </PageContext.Provider>
    );
};

//custom access to the context
export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePageContext must be used within a PageProvider');
    }
    return context;
};
