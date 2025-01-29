import { Request, Response } from 'express';
import EmailController from './emailController.js';
import { Users } from '../models/index.js';
import bcrypt from 'bcrypt';

class AuthController {
    private emailController: EmailController;

    constructor() {
        this.emailController = new EmailController();
        this.register = this.register.bind(this);
        this.resendVerification = this.resendVerification.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { login, email, password, display_name } = req.body;
    
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create user
            const user = await Users.create({
                display_name: display_name.trim(),
                login: display_name.toLowerCase(),
                email,
                password: hashedPassword,
                auth_level: 0
            });
    
            // Add user's email to the request
            req.body.email = email;

            // Send verification email
            await this.emailController.emailVerificationRequest(req, res);
    
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Registration failed' });
        }
    };

    resendVerification = async (req: Request, res: Response): Promise<void> => {
        // TODO: Complete this
        return;
    };

    login = async (req: Request, res: Response): Promise<void> => {
        // TODO: Complete this
        return;
    };

    logout = async (req: Request, res: Response): Promise<void> => {
        // TODO: Complete this
        return;
    };
}

export default AuthController;