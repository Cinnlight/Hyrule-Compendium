import express from 'express';
import PageController from '../../controllers/pageController.js';

const pageRouter = express.Router();

// Get all categories
pageRouter.get('/categories', PageController.getAllCategories);

// Get pages by category
pageRouter.get('/category', PageController.getPagesByCategory);

// Get all page info by pageId
pageRouter.get('/info', PageController.getAllPageInfo);


export default pageRouter;