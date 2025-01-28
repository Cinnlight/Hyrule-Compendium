import express, { Request, Response } from 'express';
import { Comments, Users, Reactions } from '../models/index.js';

const router = express.Router();

// Get all comments with user's display_name and reactions
const getAllComments = async (req: Request, res: Response) => {
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

router.get('/all', getAllComments);

export default router;