import { Router } from 'express';
import EmailController from '../../controllers/emailController.js';

const emailRouter = Router();
const emailController = new EmailController();

// TODO: Fix the controller methods
emailRouter.get('/verify', emailController.emailVerificationCallback);
emailRouter.post('/verification', emailController.emailVerificationRequest);

export default emailRouter;