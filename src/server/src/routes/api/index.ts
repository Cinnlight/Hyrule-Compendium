import express from "express";
import commentRouter from "./comments.js";
import userRouter from "./users.js";
import pageRouter from "./pages.js";
import auth from "../../middleware/auth.js";

const apiRouter = express.Router();

// Protect all API routes with auth middleware
// apiRouter.use(auth);

apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/pages', pageRouter);

export default apiRouter;