// ui/components/create/createComment.tsx
'use client';

import { useState, } from 'react';
import api from '../../../lib/api.js';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CommentFormProps {
    page_id: string;
    onCommentSubmit: (newComment: string) => void; //callback to update the ui with the new comment
}

const CommentForm: React.FC<CommentFormProps> = ({ page_id, onCommentSubmit}) => {
    const [commentText, setCommentText] = useState<string>(''); //state for comment input
    const [isLoading, setIsLoading] = useState<boolean>(false); //state for loading indicator
    const [error, setError] = useState<string | null>(null); //state for error message

    // hadle change in the input field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    // handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
       
       // used to get user_id from the token
        const token = localStorage.getitem('token');
            const decoded = jwt.decode(token) as JwtPayload | null;
        const user_id = decoded?.userId;
        
        event.preventDefault();
        if (commentText.trim() === '') {
            setError( 'Please enter a comment if you wish to submit one.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try{
            const response = await api.post('/api/comments/create', {
                page_id, 
                comment: commentText,
                user_id,
            });

            //if the request is suxxessful, call the onCommentSubmit callback to update the ui
            if (response.status === 200) {
                onCommentSubmit(commentText); // pass the new comment to the parent to update the UI
                setCommentText(''); //clear the input field
            }
        } catch (err: any) {
            console.error('Error submitting comment:', err);
            setError('Failed to submit comment. Please try again.');;
        } finally {
            setIsLoading(false); // stop loading indicator
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='commentText'>Add a Comment</label>
                    <input
                        id='commentText'
                        type='text'
                        value={commentText}
                        onChange={handleInputChange}
                        placeholder='Type your comment here...'
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <button type='submit' disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit Comment'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default CommentForm;