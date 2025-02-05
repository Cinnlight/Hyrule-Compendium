import express from 'express';
import CommentController from '../../controllers/commentController.js';
const commentRouter = express.Router();
// Get all comments and their reaction(s) and reaction count(s)
commentRouter.get('/all', CommentController.getAllComments);
// Get all comments for a specific page
commentRouter.post('/page', CommentController.getCommentsByPageId);
// Create a new comment
commentRouter.post('/create', CommentController.createComment);
// Update a comment
commentRouter.patch('/update', CommentController.updateComment);
// Delete a comment
commentRouter.delete('/delete', CommentController.deleteComment);
// Add a reaction to a comment
commentRouter.post('/reaction/add', CommentController.addReaction);
export default commentRouter;
