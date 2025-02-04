import express from 'express';
import UserController from '../../controllers/userController.js';

const userRouter = express.Router();

// Get all comments and their reaction(s) and reaction count(s)
userRouter.get('/all', UserController.getAllUsers);

export default userRouter;