// ui/components/create/createComment.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import { jwtDecode } from 'jwt-decode';

interface CommentFormProps {
    page_id: string;
    onCommentSubmit?: (newComment: { text: string; submitted: boolean }) => void; //callback to update the ui with the new comment
}

const CommentForm: React.FC<CommentFormProps> = ({ page_id, onCommentSubmit}) => {
    const [commentText, setCommentText] = useState<string>(''); //state for comment input
    const [isLoading, setIsLoading] = useState<boolean>(false); //state for loading indicator
    const [error, setError] = useState<string | null>(null); //state for error message
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); //state for submit status

  
    // hadle change in the input field
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value);
    };

    // handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
         
        event.preventDefault();
       
        if (commentText.trim() === '') {
            setError( 'Please enter a comment if you wish to submit one.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        let user_id: string | null = null;
        if (token) {
            try {
                const decoded:any = jwtDecode(token);
                user_id = decoded?.id ? String(decoded.id) :null;
            } catch (error) {
                console.error('Error decoding token:', error);
                setError('Failed to decode token. Please refresh and try again.');
                setIsLoading(false);
                return;
            }
        }

        if (!user_id) {
            setError('User ID not found. Please refesh and try again.');
            setIsLoading(false);
            return;
        }

        const comment = commentText.trim();

        try {
            const response = await api.post('/api/comments/create', {
                page_id, 
                comment,
                user_id,
            });

            //if the request is successful, call the onCommentSubmit callback to update the ui
            if (response.status === 200) {
                onCommentSubmit?.({text: comment, submitted: true}); // pass the new comment to the parent to update the UI
                setIsSubmitted(true); // set the submit status to true
                setCommentText(''); //clear the comment state
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
                <label htmlFor='commentText'>Add a Comment</label>
                {!isSubmitted ? (
                    <div>
                        <textarea
                            id='commentText'
                            rows={4}
                            cols={50}
                            value={commentText}
                            onChange={handleInputChange}
                            placeholder='Type your comment here...'
                            disabled={isLoading}
                        />
                        <button type='submit' disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit Comment'}
                        </button>
                    </div>
                ) : (
                    <p style={{ color: 'green' }}>Comment submitted successfully!</p>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default CommentForm;