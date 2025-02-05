// ui/components/commentSection.tsx
'use client';

import { useState, useEffect } from 'react';
import CommentForm from './create/createComment';
import { usePageContext } from '../../lib/pageContext';
import api from '../../lib/api';


const CommentSection: React.FC = () => {
    const { selectedPageId } = usePageContext(); //get the context value
    const [comments, setComments] = useState<any[]>([]);


    const fetchComments = async () => {
        try {
            const response = await api.post('/api/comments/page', { page_id: selectedPageId });
            setComments(response.data);
            //console.log('Comments called by selectedPageId in <CommoneSection />:', response.data); // optional for bugfixing
        } catch (error) {
            console.error('Error fetching comments:', error);
        };
    };

    useEffect(() => {
        if (selectedPageId) {
            fetchComments();
        }
    }, [selectedPageId]);


    // callback function to handle new comments
    const handleNewComment = (newComment: string) => {
        setComments((prevComments) => [...prevComments,{ comment: newComment}]); // adds new comment object to the list
    };

    return(
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map((commentObj, index) => (
                    <li key={index}>
                        <p>
                            {commentObj.comment}
                        </p>
                        <span>Posted by: {commentObj.User.display_name}</span>
                    </li>
                ))}
            </ul>
            {selectedPageId ? <CommentForm page_id={selectedPageId} onCommentSubmit={handleNewComment}/>: <p>No page selected</p>}

        </div>
    );
};

export default CommentSection;