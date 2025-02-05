// ui/compponents/create/reactionButton.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '../../../lib/api';

interface ReactionButtonProps {
    comment_id: string;
    reaction: ReactionAttributes;
    userReaction: ReactionAttributes | null; //store the users current reaction
    updateReactions: (newReactions: any) => void; //function to update the reactions
}

interface ReactionAttributes {
    reaction_id: number;
    emoji_url: string;
}

const ReactionButton = ({
    comment_id,
    reaction,
    userReaction,
    updateReactions
}: ReactionButtonProps) => {
    const [reactionCount, setReactionCount] = useState<number>(0);

    useEffect(() => {
        //fetch the current count of reactions for this type
        const fetchReactions = async () => {
            const response = await api.get(`/api/comments/${comment_id}/reactions`);
            if (response.data) {
                const reactionData = response.data.reactions;
                //findf the reaction count for this specific type
                const reactionDataForType = reactionData.find((r: any) => r.reaction_id === reaction.reaction_id);
                setReactionCount(reactionDataForType ? reactionDataForType.count : 0);
            }
        };

        fetchReactions();
    }, [comment_id, reaction.reaction_id]);

    const handleReaction = async () => {
        if (userReaction && userReaction.reaction_id === reaction.reaction_id) {
            // if the user already reacted with this type, change css to show this (grey out?)
            return; //TODO: add css class to show that the user has already reacted with this type
        }

        try {
            //send reaction to the server
            const response = await api.post(`/api/comments/${comment_id}/reactions`, {
                reaction: reaction.reaction_id 
            });
        
            if (response.status === 200) {
                //update the reaction count after successfullyt posting the reaction
                updateReactions(response.data.reactions);
            }
        } catch (error) {
            console.error('Error adding reaction:', error);
        }
    };

    return (
        <button onClick={handleReaction}>
            <img src={reaction.emoji_url} alt={`${reaction.reaction_id}`} />{reactionCount}
        </button>
    );
};

export default ReactionButton;