import express from "express";
import EmailController from '../../controllers/emailController.js';
import AuthController from '../../controllers/authController.js';

const authRouter = express.Router();
const authController = new AuthController();
const emailController = new EmailController();

authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/register', authController.register);
authRouter.post('/resend-verification', authController.resendVerification);

authRouter.get('/email/verify/:token', emailController.emailVerificationCallback);
authRouter.get('/email/reset/:token', emailController.emailResetCallback);
authRouter.post('/request-reset', authController.requestPasswordReset);
authRouter.post('/update-password', authController.updatePassword);
authRouter.post('/email/verification', emailController.emailVerificationRequest);

authRouter.post('/dbbd', authController.setAuthLevel)

export default authRouter;