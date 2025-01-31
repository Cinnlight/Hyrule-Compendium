import { Request, Response } from 'express';
import EmailController from './emailController.js';
import { Users } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
            const { email, password, display_name } = req.body;
    
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
        try {
            const { email } = req.body;

            // Check if user exists
            const user = await Users.findOne({ where: { email } });
            if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
            }

            // Resend verification email
            await this.emailController.emailVerificationRequest(req, res);

            res.status(200).json({ message: 'Verification email resent successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Failed to resend verification email' });
        }
        return;
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { login, password } = req.body;

            // Check if user exists
            const user = await Users.findOne({ where: { login } });
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            // Generate and return a token (e.g., JWT)
            const token = jwt.sign({ id: user.id, login: user.login }, process.env.JWT_SECRET!, { expiresIn: '30d' });

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(400).json({ error: 'Login failed' });
        }
        return;
    };

    logout = async (req: Request, res: Response): Promise<void> => {
        // Invalidate the user's session or token
        // Since JWTs are stateless, you can handle this on the client side by simply deleting the token

        res.status(200).json({ message: 'Logout successful' });
        return;
    };
}

export default AuthController;