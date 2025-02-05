// ui/components/commentSection.tsx
'use client';

import { useState, useEffect } from 'react';
import CommentForm from './create/createComment';
import { usePageContext } from '../../lib/pageContext';
import api from '../../lib/api';
import ReactionButton from './create/reactionButton';

interface Comment {
    comment: string;
    User: {
        display_name: string;
    };
    Reactions?: Array<{
        emoji_url: string;
    }>;
}

const CommentSection: React.FC = () => {
    const { selectedPageId } = usePageContext(); //get the context value
    const [comments, setComments] = useState<Comment[]>([]);


    const fetchComments = async () => {
        try {
            const response = await api.post('/api/comments/page', { page_id: selectedPageId });
            setComments(response.data);
            console.log('Comments called by selectedPageId in <CommentSection />:', response.data); // optional for bugfixing
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
    const handleNewComment = (newComment: { text: string; submitted: boolean }) => {
        setComments((prevComments) => [
            ...prevComments,
            {
                comment: newComment.text,
                User: { display_name: "You" }, // temporary placeholder for user display name until refresh
            }
        ]); // adds new comment object to the list
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
                        <span>Posted by: {commentObj.User?.display_name}</span>
                        {commentObj.Reactions && commentObj.Reactions.length > 0 && 
                            commentObj.Reactions.map((reaction: any, index: number) => (
                                <img key={index} src={reaction.emoji_url} alt="Reaction" />
                            ))
                        }
                    </li>
                ))}
            </ul>
            {selectedPageId ? <CommentForm page_id={selectedPageId} onCommentSubmit={handleNewComment}/>: <p>No page selected</p>}

        </div>
    );
};

export default CommentSection;