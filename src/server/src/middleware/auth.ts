import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include login and id properties
declare global {
    namespace Express {
        interface Request {
            login: string;
            id: string;
        }
    }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error('No authentication token provided');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        
        // Add decoded user data to request
        req.id = (decoded as jwt.JwtPayload).id;
        req.login = (decoded as jwt.JwtPayload).login;
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

export default auth;