import { Sequelize, Model, DataTypes } from "sequelize";

// Define attributes for the Category
interface CategoryAttributes {
    page_id: number;
    category_id: number;
    key: string[];
}

export class Categories extends Model<CategoryAttributes> implements CategoryAttributes {
    public page_id!: number;
    public category_id!: number;
    public key!: string[];
}

export function CategoryFactory(sequelize: Sequelize): typeof Categories {
    Categories.init(
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
                allowNull: false,
            },
        },
        {
            modelName: "Categories",
            tableName: "Page Categories",
            timestamps: false,
            sequelize,
        }
    );

    return Categories;
}
