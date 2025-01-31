import { Sequelize, Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

// Define attributes for the PageCategory
interface PageCategoryAttributes {
    page_id: string;
    category_id: string;
    key?: string[];
}

export class PageCategories extends Model<PageCategoryAttributes> implements PageCategoryAttributes {
    declare page_id: string;
    declare category_id: string;
    declare key?: string[];
}

export function PageCategoryFactory(sequelize: Sequelize): typeof PageCategories {
    PageCategories.init(
        {
            page_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Pages',
                    key: 'id'
                },
            },
            category_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Categories',
                    key: 'id'
                },
            },
            key: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: true,
            },
        },
        {
            modelName: "PageCategories",
            tableName: "Page Categories",
            timestamps: false,
            sequelize,
        }
    );

    return PageCategories;
}