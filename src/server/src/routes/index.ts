import router from 'express';
// import auth from '../auth/auth.js';
import apiRouter from './api/index.js';

const routes = router();

routes.use('/api', apiRouter);
// routes.use('/auth', authRouter);

export default routes;