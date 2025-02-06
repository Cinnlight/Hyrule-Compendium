// ui/components/commentSection.tsx
'use client';

import { useState, useEffect } from 'react';
import CommentForm from './create/createComment';
import { usePageContext } from '../../lib/pageContext';
import api from '../../lib/api';
import ReactionButton from './create/reactionButton';
import styles from '../page.module.css';

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
    const { selectedPageId } = usePageContext();
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = async () => {
        try {
            const response = await api.post('/api/comments/page', { page_id: selectedPageId });
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        if (selectedPageId) {
            fetchComments();
        }
    }, [selectedPageId]);

    const handleNewComment = (newComment: { text: string; submitted: boolean }) => {
        setComments((prevComments) => [
            ...prevComments,
            {
                comment: newComment.text,
                User: { display_name: "You" },
            }
        ]);
    };

    return (
        <div className={styles.comments}>
            <h2>Comments</h2>
            <ul>
                {comments.map((commentObj, index) => (
                    <li key={index} className={styles.comment}>
                        <p>{commentObj.comment}</p>
                        <small>Posted by: {commentObj.User?.display_name}</small>
                        {commentObj.Reactions && commentObj.Reactions.length > 0 && (
                            <div>
                                {commentObj.Reactions.map((reaction: any, index: number) => (
                                    <img key={index} src={reaction.emoji_url} alt="Reaction" />
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {selectedPageId ? 
                <CommentForm page_id={selectedPageId} onCommentSubmit={handleNewComment}/> 
                : <p>No page selected</p>
            }
        </div>
    );
};

export default CommentSection;