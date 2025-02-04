// ui/components/categories.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '../../lib/api';

interface Category {
    id: number;
    name: string;
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch categories from the server
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/pages/categories');

                setCategories(response.data);
                // console.log(response.data); // optional log for debugging
            } catch (error) {
                setError('Error fetching categories');
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = async (categoryId: number) => {
        console.log(categoryId); //optional debugging
        try{
            const response = await api.post('/api/pages/category', { categoryId });
            setSelectedCategory(response.data);
        } catch (error) {
            setError('Error fetching category pages');
            console.error(error);
        }
    };

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
            {selectedCategory && (
                <div>
                    <h2>{selectedCategory.name}</h2>
                    {/* You can add more details here for the selected category */}
                    <p>Details about {selectedCategory.name}.</p>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
