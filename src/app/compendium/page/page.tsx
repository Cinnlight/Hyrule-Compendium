// compendium/page/page.tsx
'use client';

import PageContent from '../../ui/components/pageContent.js';
import { usePageContext } from '../../lib/pageContext.js';
import CommentForm from '../../ui/components/create/createComment.js';


const CompendiumPage = () => {

    const { selectedPageId } = usePageContext(); // get the context value
    const page_id = selectedPageId;
    return (
        <div>
            {selectedPageId ? <PageContent />: <p>No page selected</p>}
            {selectedPageId ? <CommentForm page_id={page_id}/>: <p>No page selected</p>}
        </div>
    )
}

export default CompendiumPage;