import { EmailService, EmailVerificationResult } from '../../services/noReplyEmail.js';

const emailService = new EmailService();

// app.post('/api/email-verification', async (req: Request, res: Response) => {
//     try {
//       const result: EmailVerificationResult = await emailService.sendEmailVerification(req.body);
//       if (result.success) {
//         res.json(result);
//       } else {
//         res.status(500).json(result);
//       }
//     } catch (error: any) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   });
  
// app.get('/api/verify-email', async (req: Request, res: Response) => {
// const { token, email } = req.query;

// if (!token || !email || typeof token !== 'string' || typeof email !== 'string') {
//     return res.status(400).json({ success: false, message: 'Missing or invalid token or email' });
// }

// try {
//     // Find the user in database
//     const user = await Users.findOne({ where: { email } });

//     if (!user) {
//     return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Verify token matches
//     if (user.email_val_key !== token) {
//     return res.status(400).json({ success: false, message: 'Invalid verification token' });
//     }

//     // Update email validation status
//     await user.update({
//     email_val: true,
//     email_val_key: null // Clear the verification token
//     });

//     return res.json({ 
//     success: true, 
//     message: 'Email verified successfully' 
//     });

// } catch (error: any) {
//     console.error('Email verification error:', error);
//     res.status(500).json({ success: false, error: error.message });
// }
// });