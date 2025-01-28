import { Sequelize, Model, DataTypes } from "sequelize";

// Define attributes for the PageCategory
interface PageCategoryAttributes {
    page_id: number;
    category_id: number;
    key?: string[];
}

export class PageCategories extends Model<PageCategoryAttributes> implements PageCategoryAttributes {
    public page_id!: number;
    public category_id!: number;
    public key?: string[];
}

export function PageCategoryFactory(sequelize: Sequelize): typeof PageCategories {
    PageCategories.init(
        {
            page_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
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