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

// Associations
Pages.belongsTo(Users, { foreignKey: 'created_by' });
Comments.belongsTo(Pages, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Comments.belongsTo(Users, { foreignKey: 'user_id' });
Content.belongsTo(Users, { foreignKey: 'created_by' });
Content.belongsTo(Pages, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Content.belongsTo(Users, { foreignKey: 'verified_by' });
Content.belongsTo(Users, { foreignKey: 'contributors' });
PageCategories.belongsTo(Categories, { foreignKey: 'category_id' });
PageCategories.belongsTo(Pages, { foreignKey: 'page_id', onDelete: 'CASCADE' });
Comments.belongsTo(Reactions, { foreignKey: 'reactions' });

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

