// compendium/page/page.tsx
'use client';

import PageContent from '../../ui/components/pageContent';
import { usePageContext } from '../../lib/pageContext';
import CommentSection from '../../ui/components/commentSection';


const CompendiumPage = () => {

    const { selectedPageId } = usePageContext(); // get the context value
    //console.log('Test for selectedPageId provider(page route):', selectedPageId); //optional for bugfixing
    return (
        <div>
            {selectedPageId ? <PageContent />: <p>No page selected</p>}
            <CommentSection />
        </div>
    )
}

export default CompendiumPage;