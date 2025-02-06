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
    
            // Input validation
            if (!email || !password || !display_name) {
                res.status(400).json({ error: 'Missing required fields', fields: { email: !email, password: !password, display_name: !display_name } });
                return;
            }
    
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ error: 'Invalid email format' });
                return;
            }
    
            // Password strength validation
            if (password.length < 6) {
                res.status(400).json({ error: 'Password must be at least 6 characters long' });
                return;
            }
    
            // Check for existing user
            const existingUser = await Users.findOne({ where: { email } });
            if (existingUser) {
                res.status(400).json({ error: 'Email already registered' });
                return;
            }
    
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

            // Add email to request body
            req.body.user = user;
    
            // Send verification email
            await this.emailController.emailVerificationRequest(req, res);
            
        } catch (error) {
            console.error('Registration error:', error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

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
                res.status(404).json({ error: 'Invalid credentials' });
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

    requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.body;
            
            // Find user to get display_name
            const user = await Users.findOne({ where: { email }});
            
            // Create UserData object with required fields
            const userData = {
                email,
                display_name: user!.display_name
            };
            
            const result = await this.emailController.emailService.sendPasswordReset(userData);
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to request password reset' });
        }
    };
    
    updatePassword = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token, password } = req.body;
            
            // Find user with this reset token
            const user = await Users.findOne({ where: { reset_key: token }});
            if (!user) {
                res.status(400).json({ success: false, error: 'Invalid or expired reset token' });
                return;
            }
    
            // Hash new password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Update password and clear reset token
            await user.update({
                password: hashedPassword,
                reset_key: null
            });
    
            res.json({ success: true, message: 'Password updated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to update password' });
        }
    };

    logout = async (req: Request, res: Response): Promise<void> => {
        // Invalidate the user's session or token
        // Since JWTs are stateless, you can handle this on the client side by simply deleting the token

        res.status(200).json({ message: 'Logout successful' });
        return;
    };

    // This method is only for testing purposes
    setAuthLevel = async (req: Request, res: Response): Promise<void> => {
        try {
            const { login, auth_level, secret } = req.body;

            // Check secret
            if (secret !== process.env.ADMIN_SECRET) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            // Check if user exists
            const user = await Users.findOne({ where: { login } });
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            // Update user's auth level
            user.auth_level = auth_level;
            await user.save();

            res.status(200).json({ message: 'Auth level updated successfully' });
        } catch (error) {
            res.status(400).json({ error: 'Failed to update auth level' });
        }
    };
}

export default AuthController;