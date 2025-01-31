import { Sequelize, Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

// Define attributes for the Category
interface CategoryAttributes {
    id: string;
    name: string;
}

export class Categories extends Model<CategoryAttributes> implements CategoryAttributes {
    declare id: string;
    declare name: string;
}

export function CategoryFactory(sequelize: Sequelize): typeof Categories {
    Categories.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuidv4(),
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
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
