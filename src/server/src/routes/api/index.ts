import express from "express";
import commentRouter from "./comments.js";
import userRouter from "./users.js";
import pageRouter from "./pages.js";
import auth from "../../middleware/auth.js";

import PageController from '../../controllers/pageController.js';

// Public router allows access to some routes without authentication
const publicRouter = express.Router();
// Get most recently updated page
publicRouter.get('/pages/recent', PageController.getMostRecentlyUpdatedPage);

// API router contains all routes that require authentication
const apiRouter = express.Router();
// Protect all API routes with auth middleware
apiRouter.use(auth);

apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/pages', pageRouter);

export { apiRouter, publicRouter };