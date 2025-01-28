import express from 'express';
import CommentController from '../../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.get('/all', CommentController.getAllComments);

export default commentRouter;