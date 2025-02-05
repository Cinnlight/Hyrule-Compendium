import { Request, Response } from 'express';
import { Pages, Users, Categories, ContentContributors, Comments, PageCategories, Content, Reactions } from '../models/index.js';

class PageController {
    getAllCategories = async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = await Categories.findAll();
            res.json(categories);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetchingcategories' });
            return;
        }
    };
      
    getPagesByCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const { categoryId } = req.body;
            const pageCategories = await PageCategories.findAll({
            where: { category_id: categoryId },
            include: [{ model: Pages, as: 'page' }]
            });
            const pages = pageCategories.map(pc => pc.get('page'));
            res.json(pages);
            return;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching pages for category' });
            return;
        }
    };

    getAllPageInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const { pageId } = req.body;
            const page = await Pages.findOne({
                where: { id: pageId },
                attributes: ['title', 'created_at', 'updated_at']
            });
            if (!page) {
                res.status(404).json({ message: 'Page not found' });
                return;
            }
            const comments = await Comments.findAll({
                where: { page_id: pageId },
                include: [{ model: Reactions }],
                order: [['created_at', 'DESC']],
                limit: 10
            });

            const contentsWithContributors = await Content.findAll({
                where: { page_id: pageId },
                include: [{ model: Users, as: 'contributors', attributes: ['id', 'display_name'], through: { attributes: [] } }]
            });
            const contributorsMap = new Map<string, any>();
            contentsWithContributors.forEach(content => {
                const users = content.get('contributors') as any[] || [];
                users.forEach(user => {
                    if (!contributorsMap.has(user.id)) {
                        contributorsMap.set(user.id, user);
                    }
                });
            });
            const contributors = Array.from(contributorsMap.values());

            res.json({
                title: page.get('title'),
                created_at: page.get('created_at'),
                updated_at: page.get('updated_at'),
                contributors,
                comments,
                contents: contentsWithContributors
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching page info' });
        }
    };

    getMostRecentlyUpdatedPage = async (req: Request, res: Response): Promise<void> => {
        try {
            const page = await Pages.findOne({
                order: [['updated_at', 'DESC']],
            });
            if (!page) {
                res.status(404).json({ message: 'No pages found' });
                return;
            }
            res.json(page);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching most recently updated page' });
        }
    };
}

export default new PageController();