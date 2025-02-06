// ui/compponents/create/reactionButton.tsx
'use client';

import { useState, } from 'react';
import api from '../../../lib/api';

interface ReactionButtonProps {
    comment_id: string;
    reaction: {
        reaction_id: number;
        emoji_url: string;
    };
    user_id: string;
    count: number;
    updateReactions: (commentId: string, newReactions: any, countUpdate: any) => void; //function to update the reactions
}


const ReactionButton = ({ comment_id, reaction, user_id, count, updateReactions }: ReactionButtonProps) => {
    const [userReacted, setUserReacted] = useState<boolean>(false);
    const [reactionCount, setReactionCount] = useState<number>(count);

    
    const handleReactionClick = async () => {
        try {
            const response = await api.post(`/api/comments/reaction/add`, {
                comment_id,
                reaction: reaction.reaction_id,
                user_id,
            });
            //console.log(response.data) // optional for debugging
            if (response.status === 200) {
                const newReaction = response.data.reaction;
                const countUpdate = response.data.count;
                setReactionCount((prev) => (userReacted ? prev -1 : prev + 1));
                updateReactions(comment_id, newReaction, countUpdate);
                setUserReacted(!userReacted);
            }
        } catch (error) {
            console.error('Error adding reaction:', error);
        }
    };

    return (
        <button onClick={handleReactionClick} style={{ opacity: userReacted ? 0.5 : 1}}>
            {reaction.emoji_url} {reactionCount > 0 && reactionCount}
        </button>
    );
};

export default ReactionButton;