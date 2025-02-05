// compendium/page/page.tsx
'use client';

import PageContent from '../../ui/components/pageContent';
import { usePageContext } from '../../lib/pageContext';
import CommentForm from '../../ui/components/create/createComment';


const CompendiumPage = () => {

    const { selectedPageId } = usePageContext(); // get the context value
    const page_id = selectedPageId;
    console.log('Test for selectedPageId provider(page route):', selectedPageId); //optional for bugfixing
    return (
        <div>
            {selectedPageId ? <PageContent />: <p>No page selected</p>}
            {selectedPageId ? <CommentForm page_id={page_id}/>: <p>No page selected</p>}
        </div>
    )
}

export default CompendiumPage;