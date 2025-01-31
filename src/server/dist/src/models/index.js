import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
// Import factory functions
import { Categories, CategoryFactory } from './categories.js';
import { CommentReactions, CommentReactionsFactory } from './comment-reactions.js';
import { Comments, CommentFactory } from './comments.js';
import { Content, ContentFactory } from './content.js';
import { PageCategories, PageCategoryFactory } from './page-categories.js';
import { Pages, PageFactory } from './pages.js';
import { Users, UserFactory } from './users.js';
import { Reactions, ReactionFactory } from './reactions.js';
import { ContentContributors, ContentContributorsFactory } from './content-contributors.js';
// Initialize Sequelize instance
const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false,
    });
// Initialize all models
CategoryFactory(sequelize);
CommentFactory(sequelize);
ContentFactory(sequelize);
PageCategoryFactory(sequelize);
PageFactory(sequelize);
UserFactory(sequelize);
ReactionFactory(sequelize);
ContentContributorsFactory(sequelize);
CommentReactionsFactory(sequelize);
// Associations
Pages.belongsTo(Users, { foreignKey: 'created_by' });
// Comment to Page Relationship
Comments.belongsTo(Pages, { foreignKey: 'page_id', onDelete: 'CASCADE' });
// Comment to User Relationship
Comments.belongsTo(Users, { foreignKey: 'user_id' });
// Content Relationships
Content.belongsTo(Users, { foreignKey: 'created_by' });
Content.belongsTo(Pages, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Content.belongsTo(Users, { foreignKey: 'verified_by' });
// Content Contributors Relationships
Content.belongsToMany(Users, { foreignKey: 'content_id', otherKey: 'user_id', through: ContentContributors });
Users.belongsToMany(Content, { foreignKey: 'user_id', otherKey: 'content_id', through: ContentContributors, onDelete: 'CASCADE' });
PageCategories.belongsTo(Categories, { foreignKey: 'id' });
Categories.belongsTo(PageCategories, { foreignKey: 'category_id', onDelete: 'CASCADE' });
PageCategories.belongsTo(Pages, { foreignKey: 'id' });
// Comment Reactions Associations
Comments.belongsToMany(Reactions, { through: CommentReactions, foreignKey: 'comment_id', onDelete: 'CASCADE' });
Reactions.belongsToMany(Comments, { through: CommentReactions, foreignKey: 'reaction_id' });
// Export models and sequelize instance
export { sequelize, Categories, Comments, Content, PageCategories, Pages, Users, Reactions, CommentReactions };
