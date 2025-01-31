import { Comments, Users, Reactions } from '../models/index.js';
class CommentController {
    // Get all comments with user's display_name and reactions
    getAllComments = async (req, res) => {
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
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to retrieve comments' });
        }
    };
    // Create a new comment
    createComment = async (req, res) => {
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
        }
        catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ error: 'Failed to create comment' });
        }
    };
}
;
export default new CommentController();
