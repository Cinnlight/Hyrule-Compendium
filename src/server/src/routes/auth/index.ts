import express from "express";
import EmailController from '../../controllers/emailController.js';
import AuthController from '../../controllers/authController.js';

const authRouter = express.Router();
const authController = new AuthController();

const emailRouter = express.Router();
const emailController = new EmailController();

authRouter.post('/auth/login', authController.login);
authRouter.post('/auth/logout', authController.logout);
authRouter.post('/auth/register', authController.register);
authRouter.post('/auth/resend-verification', authController.resendVerification);

emailRouter.get('/email/verify', emailController.emailVerificationCallback);
emailRouter.post('/email/verification', emailController.emailVerificationRequest);

export default authRouter;