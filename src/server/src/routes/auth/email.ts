import express from 'express';
import EmailController from '../../controllers/emailController.js';

const emailRouter = express.Router();
const emailController = new EmailController();

// Use the instance to access the methods
emailRouter.get('/verify', emailController.emailVerificationCallback);
emailRouter.post('/verification', emailController.emailVerificationRequest);

export default emailRouter;