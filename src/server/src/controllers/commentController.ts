import { Request, Response } from 'express';
import { Comments, Users, Reactions } from '../models/index.js';

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
                    },
                ],
            });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve comments' });
        }
    };
};

export default new CommentController();