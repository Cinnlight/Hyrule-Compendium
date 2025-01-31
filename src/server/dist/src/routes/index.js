import router from 'express';
import authRouter from './auth/index.js';
import apiRouter from './api/index.js';
const routes = router();
routes.use('/api', apiRouter);
routes.use('/auth', authRouter);
export default routes;
