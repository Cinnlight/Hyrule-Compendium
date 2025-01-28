import { Sequelize, Model, DataTypes } from "sequelize";

// Define attributes for the Category
interface CategoryAttributes {
    id: number;
    name: string;
}

export class Categories extends Model<CategoryAttributes> implements CategoryAttributes {
    declare id: number;
    declare name: string;
}

export function CategoryFactory(sequelize: Sequelize): typeof Categories {
    Categories.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            modelName: "Categories",
            tableName: "Categories",
            timestamps: false,
            sequelize,
        }
    );

    return Categories;
}
