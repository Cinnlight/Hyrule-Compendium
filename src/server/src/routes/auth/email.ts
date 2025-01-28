import express from 'express';
import EmailController from '../../controllers/emailController.js';

const emailRouter = express.Router();

// TODO: Fix the controller methods
// emailRouter.get('/verify', EmailController.emailVerificationCallback);
// emailRouter.post('/verification', EmailController.emailVerificationRequest);

export default emailRouter;