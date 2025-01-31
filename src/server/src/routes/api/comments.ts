import express from 'express';
import CommentController from '../../controllers/commentController.js';

const commentRouter = express.Router();

// Get all comments and their reaction(s) and reaction count(s)
commentRouter.get('/all', CommentController.getAllComments);

// Create a new comment
commentRouter.post('/create', CommentController.createComment);

export default commentRouter;