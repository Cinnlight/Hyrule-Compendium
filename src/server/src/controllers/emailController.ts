import { Request, Response } from 'express';
import { Users } from '../models/index.js';
import { EmailService, EmailVerificationResult } from '../services/noReplyEmail.js';

class EmailController {
    emailService = new EmailService();

    constructor() {
        this.emailVerificationCallback = this.emailVerificationCallback.bind(this);
        this.emailVerificationRequest = this.emailVerificationRequest.bind(this);
    }

    emailVerificationCallback = async (req: Request, res: Response): Promise<void> => {
        const token = req.query.token as string;
        const email = req.query.email as string;
        const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.BASE_URL as string : 'http://localhost:3000';

        if (!token || !email) {
            res.status(400).json({
                success: false,
                message: 'Missing required parameters: token and email'
            });
            return;
        }

        try {
            const user = await Users.findOne({ where: { email } });

            if (!user) {
                // res.status(404).json({ 
                //     success: false, 
                //     message: 'User not found' 
                // });
                res.redirect(BASE_URL);
                return;
            }

            if (user.email_val_key !== token) {
                // res.status(400).json({ 
                //     success: false, 
                //     message: 'Invalid verification token' 
                // });
                res.redirect(BASE_URL);
                return;
            }

            await user.update({
                email_val: true,
                email_val_key: null
            });

            // res.json({ 
            //     success: true, 
            //     message: 'Email verified successfully' 
            // });
            res.redirect(BASE_URL);
            return;

        } catch (error: any) {
            console.error('Email verification error:', error);
            // res.status(500).json({ 
            //     success: false, 
            //     error: error.message 
            // });
            res.redirect(BASE_URL);
            return;
        }
    };

    emailVerificationRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const result: EmailVerificationResult = await this.emailService.sendEmailVerification(req.body);
            
            if (result.success) {
                res.json(result);
                return;
            }
            
            res.status(500).json(result);
            return;
        } catch (error: any) {
            console.error('Email verification request error:', error);
            res.status(500).json({ 
                success: false, 
                error: error.message 
            });
            return;
        }
    };
}

export default EmailController;