'use client';

import { useState, useEffect } from 'react';

interface CommentFormProps {
    page_id: string;
    onCommentSubmit?: (comment: { text: string; submitted: boolean }) => void;
}
import api from '../../../lib/api';
import { jwtDecode } from 'jwt-decode';

const CommentForm: React.FC<CommentFormProps> = ({ page_id, onCommentSubmit}) => {
    const [commentText, setCommentText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Move localStorage access to useEffect
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserId(decoded?.id ? String(decoded.id) : null);
            } catch (error) {
                console.error('Error decoding token:', error);
                setError('Failed to decode token. Please refresh and try again.');
            }
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (commentText.trim() === '') {
            setError('Please enter a comment if you wish to submit one.');
            return;
        }

        if (!userId) {
            setError('User ID not found. Please refresh and try again.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const comment = commentText.trim();

        try {
            await api.post('/api/comments/create', {
                page_id,
                comment,
                user_id: userId,
            });

            setCommentText('');
            setIsSubmitted(true);
            onCommentSubmit?.({text: comment, submitted: true});
        } catch (err: any) {
            console.error('Error submitting comment:', err);
            setError('Failed to submit comment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setCommentText(event.target.value);
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='commentText'>Add a Comment</label>
                {!isSubmitted ? (
                    <>
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
                        </div>
                        <button type='submit' disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit Comment'}
                        </button>
                    </>
                ) : (
                    <p style={{ color: 'green' }}>Comment submitted successfully!</p>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default CommentForm;