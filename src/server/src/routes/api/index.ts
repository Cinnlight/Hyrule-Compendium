import express from "express";
import commentRouter from "./comments.js";

const apiRouter = express.Router();

apiRouter.use('/comments', commentRouter);

export default apiRouter;