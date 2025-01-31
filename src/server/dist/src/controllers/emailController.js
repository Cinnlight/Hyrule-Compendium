import { Users } from '../models/index.js';
import { EmailService } from '../services/noReplyEmail.js';
class EmailController {
    emailService = new EmailService();
    constructor() {
        this.emailVerificationCallback = this.emailVerificationCallback.bind(this);
        this.emailVerificationRequest = this.emailVerificationRequest.bind(this);
    }
    emailVerificationCallback = async (req, res) => {
        const token = req.query.token;
        const email = req.query.email;
        const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000';
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
        }
        catch (error) {
            console.error('Email verification error:', error);
            // res.status(500).json({ 
            //     success: false, 
            //     error: error.message 
            // });
            res.redirect(BASE_URL);
            return;
        }
    };
    async emailVerificationRequest(req, res) {
        try {
            const result = await this.emailService.sendEmailVerification(req.body.email);
            if (result.success) {
                res.json(result);
                return true;
            }
            res.status(500).json(result);
        }
        catch (error) {
            console.error('Email verification error:', error);
        }
        finally {
            return false;
        }
    }
    ;
}
export default EmailController;
