import express from 'express';
import UserController from '../../controllers/userController.js';

const userRouter = express.Router();

// Get all users and their everything
userRouter.get('/all', UserController.getAllUsers);

// Get user by id
userRouter.get('/id', UserController.getUserById);

// Get user by login
userRouter.get('/login', UserController.getUserByLogin);

export default userRouter;