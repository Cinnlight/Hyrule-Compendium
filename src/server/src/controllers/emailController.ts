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
        const token = req.params.token as string;
        const email = req.params.email as string;
        const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.APP_URL as string : 'http://localhost:3000';

        if (!token || !email) {
            res.status(400).json({
                success: false,
                message: 'Verification Error'
            });
            return;
        }

        try {
            const user = await Users.findOne({ where: { email } });

            if (!user) {
                res.redirect(BASE_URL);
                return;
            }

            if (user.email_val_key !== token) {
                res.redirect(BASE_URL);
                return;
            }

            await user.update({
                email_val: true,
                email_val_key: null
            });
            
            res.redirect(BASE_URL);
            return;

        } catch (error: any) {
            console.error('Email verification error:', error);
            res.redirect(BASE_URL);
            return;
        }
    };

    emailVerificationRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { user } = req.body;
            const result: EmailVerificationResult = await this.emailService.sendEmailVerification(user);
            
            if (result.success) {
                res.json(result);
                return;
            }
            
            res.status(500).json(result);
        } catch (error) {
            console.error('Email verification error:', error);
            res.status(500).json({ success: false, error: 'Failed to send verification email' });
        }
    };
}

export default EmailController;