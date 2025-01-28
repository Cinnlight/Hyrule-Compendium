import express from "express";
// import Auth from "./auth.js";
import emailRouter from "./email.js";

const authRouter = express.Router();

// apiRouter.use('/login', Auth.login);
authRouter.use('/email', emailRouter);

export default authRouter;