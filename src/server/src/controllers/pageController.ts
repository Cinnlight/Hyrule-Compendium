import { Request, Response } from 'express';
import { Pages, Users, Categories, ContentContributors, Comments, PageCategories, Content, Reactions } from '../models/index.js';
import { Op } from "sequelize";

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
                include: [
                    // Remove Content include if association doesn't exist
                    {
                        model: Comments,
                        include: [
                            {
                                model: Users,
                                attributes: ['id', 'display_name']
                            }
                        ]
                    }
                ]
            });
    
            if (!page) {
                res.status(404).json({ message: 'No pages found' });
                return;
            }
    
            // Fetch contents separately if needed
            const contents = await Content.findAll({
                where: { page_id: page.get('id') },
                include: [
                    {
                        model: Users,
                        as: 'contributors',
                        attributes: ['id', 'display_name']
                    }
                ]
            });
    
            const comments = page.get('Comments') as any[] || [];
            const contributorsMap = new Map();
            
            contents.forEach(content => {
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
                contents
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching most recently updated page' });
        }
    };

    searchPages = async (req: Request, res: Response): Promise<void> => {
        try {
            const { search } = req.body;
            if (!search || typeof search !== "string") {
                res.status(400).json({ message: "Search query parameter is required" });
                return;
            }
            const pages = await Pages.findAll({
                where: { title: { [Op.like]: `%${search}%` } }
            });
            res.json(pages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error searching pages" });
        }
    };
}

export default new PageController();