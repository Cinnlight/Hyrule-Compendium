// compendium/page/page.tsx
'use client';

import PageContent from '../../ui/components/pageContent';
import { usePageContext } from '../../lib/pageContext';
import CommentSection from '../../ui/components/commentSection';
import styles from '../page.module.css';

const CompendiumPage = () => {
    const { selectedPageId } = usePageContext();
    
    return (
        <div className={styles.compendiumflex}>
            <div className={styles.content}>
                {selectedPageId ? <PageContent /> : <p>No page selected</p>}
                <CommentSection />
            </div>
        </div>
    );
}

export default CompendiumPage;