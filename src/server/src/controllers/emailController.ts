import { Request, Response } from 'express';
import { Users } from '../models/index.js';
import { EmailService, EmailVerificationResult } from '../services/noReplyEmail.js';

class EmailController {
    emailService = new EmailService();

    emailVerificationCallback = async (req: Request, res: Response) => {
        const { token, email } = req.query;

        if (!token || !email || typeof token !== 'string' || typeof email !== 'string') {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing or invalid token or email' 
            });
        }

        try {
            const user = await Users.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'User not found' 
                });
            }

            // TODO: Uncomment once the email_val_key and email_val is saved to the database
            // if (user.email_val_key !== token) {
            //     return res.status(400).json({ 
            //         success: false, 
            //         message: 'Invalid verification token' 
            //     });
            // }

            // await user.update({
            //     email_val: true,
            //     email_val_key: null
            // });

            return res.json({ 
                success: true, 
                message: 'Email verified successfully' 
            });

        } catch (error: any) {
            console.error('Email verification error:', error);
            return res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    };

    emailVerificationRequest = async (req: Request, res: Response) => {
        try {
            const result: EmailVerificationResult = await this.emailService.sendEmailVerification(req.body);
            
            if (result.success) {
                return res.json(result);
            }
            
            return res.status(500).json(result);
        } catch (error: any) {
            console.error('Email verification request error:', error);
            return res.status(500).json({ 
                success: false, 
                error: error.message 
            });
        }
    };
}

export default EmailController;