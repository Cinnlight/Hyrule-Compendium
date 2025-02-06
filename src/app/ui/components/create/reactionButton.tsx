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
    updateReactions: (newReactions: any) => void; //function to update the reactions
}

const ReactionButton = ({ comment_id, reaction, user_id, updateReactions }: ReactionButtonProps) => {
    const [reactionCount, setReactionCount] = useState<number>(0);
    const [userReacted, setUserReacted] = useState<boolean>(false);

    const handleReaction = async () => {
        try {
            const response = await api.post(`/api/comments/reaction/add`, {
                comment_id,
                reaction: reaction.reaction_id,
                user_id,
            });
        
            if (response.status === 200) {
                setReactionCount((prev => (userReacted ? prev - 1 : prev + 1)));
                setUserReacted(!userReacted);
                updateReactions(response.data.reactions);
            }
        } catch (error) {
            console.error('Error adding reaction:', error);
        }
    };

    return (
        <button onClick={handleReaction} style={{ opacity: userReacted ? 0.5 : 1}}>
            {reaction.emoji_url} {reactionCount}
        </button>
    );
};

export default ReactionButton;