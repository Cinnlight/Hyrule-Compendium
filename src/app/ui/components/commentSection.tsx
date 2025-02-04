// ui/components/commentSection.tsx
'use client';

import { useState } from 'react';
import CommentForm from './create/createComment';

const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<string[]>([]);

    const handleNewComment = (newComment: string) => {
        setComments((prevComments) => [...comments, newComment]); // adds new comment to the top of the list
    };

    return(
        <div>
            <h3>Comments</h3>
            <CommentForm page_id='1' onCommentSubmit={handleNewComment} />
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;