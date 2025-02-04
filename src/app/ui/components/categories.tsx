// ui/components/categories.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';
import { usePageContext } from '../../lib/pageContext';

interface Category {
    id: string;
    name: string;
}

interface Page {
    id: string;
    title: string;
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Page[]>([]);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const { setSelectedPageId } = usePageContext(); //get the context function

    useEffect(() => {
        // Fetch categories from the server
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/pages/categories');

                setCategories(response.data);
                //console.log(response.data); // optional log for debugging
            } catch (error) {
                setError('Error fetching categories');
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = async (categoryId: string) => {
        // console.log(categoryId); //optional debugging
        try{
            const response = await api.post('/api/pages/category', { categoryId });
            setSelectedCategory(response.data);
            //console.log(response.data); // optional log for debugging
        } catch (error) {
            setError('Error fetching category pages');
            console.error(error);
        }
    };

    const handlePageClick = async (pageId: string) => {
         console.log(pageId); //optional debugging 
        try{
            setSelectedPageId(pageId); //update the context
            router.push(`/compendium/page/`); // navigate to the page
        } catch (error) {
            setError('Error setting page info');
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Categories</h1>

            {/* Display any error if it occurs */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display category buttons */}
            <div>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)} //pass the cateegory id here
                        style={{ margin: '10px', padding: '10px' }}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Display selected category details */}
            <div>
                {selectedCategory.map((page) => (
                    <button
                        key={page.id}
                        onClick={() => handlePageClick(page.id)}
                        className={""}
                        >
                            {page.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
