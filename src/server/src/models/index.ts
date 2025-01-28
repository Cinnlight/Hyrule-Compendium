import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Import factory functions
import { Categories, CategoryFactory } from './categories.js';
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
  : new Sequelize(
    process.env.DB_NAME || '', 
    process.env.DB_USER || '', 
    process.env.DB_PASSWORD || '', 
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
        logging: false,
    }
);

// Initialize all models
CategoryFactory(sequelize);
CommentFactory(sequelize);
ContentFactory(sequelize);
PageCategoryFactory(sequelize);
PageFactory(sequelize);
UserFactory(sequelize);
ReactionFactory(sequelize);
ContentContributorsFactory(sequelize);

// Associations
Pages.belongsTo(Users, { foreignKey: 'created_by' });

// Comment to Page Relationship
Comments.belongsTo(Pages, { foreignKey: 'page_id', onDelete: 'CASCADE' });
// Comment to User Relationship
Comments.belongsTo(Users, { foreignKey: 'user_id' });

// Comment Reactions Relationships
Comments.belongsToMany(Reactions, { foreignKey: 'comment_id', through: 'comment_reactions', onDelete: 'CASCADE' });
Reactions.belongsToMany(Comments, { foreignKey: 'reaction_id', through: 'comment_reactions' });

// Content Relationships
Content.belongsTo(Users, { foreignKey: 'created_by' });
Content.belongsTo(Pages, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Content.belongsTo(Users, { foreignKey: 'verified_by' });

// Content Contributors Relationships
Content.belongsToMany(Users, { foreignKey: 'id', otherKey: 'user_id', through: ContentContributors });
Users.belongsToMany(Content, { foreignKey: 'id', otherKey: 'content_id', through: ContentContributors });

PageCategories.belongsTo(Categories, { foreignKey: 'id' });
Categories.belongsTo(PageCategories, { foreignKey: 'category_id', onDelete: 'CASCADE' });

PageCategories.belongsTo(Pages, { foreignKey: 'id' });

// Export models and sequelize instance
export {
  sequelize,
  Categories,
  Comments,
  Content,
  PageCategories,
  Pages,
  Users,
  Reactions
};

