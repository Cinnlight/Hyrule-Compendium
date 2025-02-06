import { Request, Response } from 'express';
import { Comments, Users, Reactions, CommentReactions } from '../models/index.js';

class CommentController {
    // Get all comments with user's display_name and reactions
    getAllComments = async (req: Request, res: Response) => {
        try {
            const comments = await Comments.findAll({
                include: [
                    {
                        model: Users,
                        attributes: ['display_name'],
                    },
                    {
                        model: Reactions,
                        through: {
                            attributes: ['count'],
                        },
                    },
                ],
            });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve comments' });
        }
    };

    getCommentsByPageId = async (req: Request, res: Response) => {
        try {
            const { page_id } = req.body;
            const comments = await Comments.findAll({
                where: { page_id },
                include: [
                    {
                        model: Users,
                        attributes: ['display_name'],
                    },
                    {
                        model: Reactions,
                        through: {
                            attributes: ['count'],
                        },
                    },
                ],
            });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve comments' });
        }
    };

    // Create a new comment
    createComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const { page_id, user_id, comment } = req.body;

            // Validate input
            if (!page_id || !user_id || !comment.trim()) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            // Create comment in the database
            const newComment = await Comments.create({
                page_id,
                user_id,
                comment,
                created_at: new Date(),
                updated_at: new Date(),
            });

            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Failed to create comment' });
        }
    };

    // Update a comment
    updateComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, comment, user_id } = req.body;

            // Validate input
            if (!id || !user_id || !comment.trim()) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            // Fetch the existing comment
            const existingComment = await Comments.findByPk(id);
            if (!existingComment) {
                res.status(404).json({ error: 'Comment not found' });
                return;
            }

            // Check user authorization
            if (existingComment.user_id !== user_id) {
                res.status(403).json({ error: 'Unauthorized user' });
                return;
            }

            // Update comment in the database
            await Comments.update(
                { comment, updated_at: new Date() },
                { where: { id } }
            );

            // Fetch updated comment details
            const updatedComment = await Comments.findByPk(id);
            res.json(updatedComment);
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).json({ error: 'Failed to update comment' });
        }
    };

    // Delete a comment
    deleteComment = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, user_id } = req.body;

            // Validate input
            if (!id || !user_id) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            // Fetch the existing comment
            const existingComment = await Comments.findByPk(id);
            if (!existingComment) {
                res.status(404).json({ error: 'Comment not found' });
                return;
            }

            // Check user authorization
            if (existingComment.user_id !== user_id) {
                res.status(403).json({ error: 'Unauthorized user' });
                return;
            }

            // Delete comment from the database
            await Comments.destroy({ where: { id } });
            res.json({ message: `Successfully deleted comment: ${existingComment.comment}` });

        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ error: 'Failed to delete comment' });
        }
    };

    // Create a new reaction
    addReaction = async (req: Request, res: Response): Promise<void> => {
        try {
            const { comment_id, reaction, user_id } = req.body;

            // Validate input
            if (!comment_id || !reaction || !user_id) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            // Verify the comment exists
            const comment = await Comments.findByPk(comment_id);
            if (!comment) {
                res.status(404).json({ error: 'Comment not found' });
                return;
            }

            // Find existing reaction for this comment regardless of user
            const existingReaction = await CommentReactions.findOne({
                where: { comment_id, reaction_id: reaction }
            });

            // Find the reaction definition from Reactions table
            const reactionDef = await Reactions.findOne({ where: { reaction_id: reaction } });
            if (!reactionDef) {
                res.status(404).json({ error: 'Reaction type not found' });
                return;
            }

            if (existingReaction) {
                // Increment the existing count
                await CommentReactions.increment('count', { where: { comment_id, reaction_id: reaction } });
                const updatedReaction = await CommentReactions.findOne({ where: { comment_id, reaction_id: reaction } });
                res.json({ message: 'Successfully updated reaction', reaction: reactionDef, count: updatedReaction?.count });
            } else {
                // Create a new CommentReactions record with count = 1
                await CommentReactions.create({ comment_id, reaction_id: reaction, user_id, count: 1 });
                res.json({ message: 'Successfully added reaction', reaction: reactionDef, count: 1 });
            }
        } catch (error) {
            console.error('Error adding reaction:', error);
            res.status(500).json({ error: 'Failed to add reaction' });
        }
    };
};

export default new CommentController();