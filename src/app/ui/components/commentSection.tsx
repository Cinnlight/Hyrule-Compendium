// ui/components/commentSection.tsx
'use client';

import { useState, useEffect } from 'react';
import CommentForm from './create/createComment';
import { usePageContext } from '../../lib/pageContext';
import api from '../../lib/api';
import ReactionButton from './create/reactionButton';
import styles from '../page.module.css';
import { jwtDecode } from 'jwt-decode';

interface Comment {
    id: string;
    comment: string;
    User: {
        display_name: string;
    };
    Reactions?: Array<{
        id: number;
        reaction_id: number;
        emoji_url: string;
        CommentReactions: {
            count: number;
        }
    }>;
}

interface Reaction {
    reaction_id: number;
    emoji_url: string;
}

const ALL_REACTIONS: Reaction[] = [
    { reaction_id: 1, emoji_url: '👍'},
    { reaction_id: 2, emoji_url: '😃'},
    { reaction_id: 3, emoji_url: '❤️'},
]

const CommentSection: React.FC = () => {
    const { selectedPageId } = usePageContext();
    const [comments, setComments] = useState<Comment[]>([]);
    const [userId, setUserId] = useState<string>('');

    const fetchComments = async () => {
        try {
            const response = await api.post('/api/comments/page', { page_id: selectedPageId });
            setComments(response.data);
             //console.log(selectedPageId); //optional for debugging
             //console.log(response.data); //optional for debugging
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        // Move localStorage access to useEffect
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded?.id ? String(decoded.id) : '');
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (selectedPageId) {
            fetchComments();
        }
    }, [selectedPageId]);

    const handleNewComment = (newComment: { text: string; submitted: boolean }) => {
        setComments((prevComments) => [
            ...prevComments,
            {
                id: Math.random().toString(), // This is just a temporary ID
                comment: newComment.text,
                User: { display_name: "You" }, // This is just a temporary display name
                Reactions: [],
            }
        ]);
    };

    const updateReactions = (commentId: string, newReactions: any) => {
        setComments((prevComments) => 
            prevComments.map((comment) => 
                comment.id === commentId 
                ? { ...comment, Reactions: newReactions}
                : comment
            )
        );
    };

    return (
        <div className={styles.comments}>
            <h2>Comments</h2>
            <ul>
                {comments.map((commentObj, index) => (
                    <li key={index} className={styles.comment}>
                        <p>{commentObj.comment}</p>
                        <small>Posted by: {commentObj.User?.display_name}</small>
                        <div>
                            {ALL_REACTIONS.map((reaction) => {
                                const existingReaction = commentObj.Reactions?.find((r) => r.reaction_id === reaction.reaction_id);
                                return (
                                    <ReactionButton 
                                        key={reaction.reaction_id}
                                        comment_id={commentObj.id}
                                        reaction={{
                                            reaction_id: reaction.reaction_id,
                                            emoji_url: reaction.emoji_url,
                                        }}
                                        user_id={userId}
                                        count={existingReaction?.CommentReactions.count || 0}
                                        updateReactions={(newReactions) => updateReactions(commentObj.id, newReactions)}
                                    />
                                );
                            })}
                        </div>
                    </li>
                ))}
            </ul>
            {selectedPageId ? 
                <CommentForm page_id={selectedPageId} onCommentSubmit={handleNewComment}/> 
                : <p>No page selected</p>
            }
            <div>
                
            </div>
        </div>
    );
};

export default CommentSection;