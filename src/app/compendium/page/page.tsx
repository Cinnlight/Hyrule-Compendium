// compendium/page/page.tsx
'use client';

import PageContent from '../../ui/components/pageContent.js';
import { usePageContext } from '../../lib/pageContext.js';


const CompendiumPage = () => {

    const { selectedPageId } = usePageContext(); // get the context value

    return (
        <div>
            {selectedPageId ? <PageContent pageId={selectedPageId} />: <p>No page selected</p>}
        </div>
    )
}

export default CompendiumPage;