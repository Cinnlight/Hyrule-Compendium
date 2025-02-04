import { Request, Response } from 'express';
import { Comments, Users, Reactions, CommentReactions } from '../models/index.js';

class UserController {
    // Get all users with user's everything
    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await Users.findAll({
                include: [
                    {
                        model: Users,
                        attributes: [
                            'id',
                            'login',
                            'display_name',
                            'email',
                            'auth_level',
                            'email_val',
                            'created_at',
                            'updated_at',
                            'avatar_url',
                        ],
                    },
                ],
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve comments' });
        }
    };
};

export default new UserController();