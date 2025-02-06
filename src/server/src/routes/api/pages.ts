import express from 'express';
import PageController from '../../controllers/pageController.js';

const pageRouter = express.Router();

// Get all categories
pageRouter.get('/categories', PageController.getAllCategories);

// Get pages by category
pageRouter.post('/category', PageController.getPagesByCategory);

// Get all page info by pageId
pageRouter.post('/info', PageController.getAllPageInfo);

// Get page by fuzzy search
pageRouter.post('/search', PageController.searchPages);

// Update page content
pageRouter.patch('/update', PageController.updatePageContent);



export default pageRouter;