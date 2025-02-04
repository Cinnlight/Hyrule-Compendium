import { Request, Response } from 'express';
import { Comments, Users, Reactions, CommentReactions } from '../models/index.js';

class UserController {
    // Get all users with user's everything
    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await Users.findAll({
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
            });
            res.json(users);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    };

    // Get user by id
    getUserById = async (req: Request, res: Response) => {
        try {
            const user = await Users.findOne({
                where: { id: req.body.id },
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
            });
            res.json(user);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to retrieve user' });
        }
    };

    // Get user by login
    getUserByLogin = async (req: Request, res: Response) => {
        try {
            const user = await Users.findOne({
                where: { login: req.body.login },
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
            });
            res.json(user);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to retrieve user' });
        }
    };
};

export default new UserController();