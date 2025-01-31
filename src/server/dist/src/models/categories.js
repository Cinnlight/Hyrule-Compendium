import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
export class Categories extends Model {
}
export function CategoryFactory(sequelize) {
    Categories.init({
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
    }, {
        modelName: "Categories",
        tableName: "Categories",
        timestamps: false,
        sequelize,
    });
    return Categories;
}
