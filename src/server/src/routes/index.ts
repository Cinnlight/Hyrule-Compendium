import router from 'express';
import authRouter from './auth/index.js';
import { publicRouter, apiRouter } from './api/index.js';

const routes = router();

routes.use('/api', publicRouter);
routes.use('/api', apiRouter);
routes.use('/auth', authRouter);

export default routes;