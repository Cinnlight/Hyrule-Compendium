import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
export class Pages extends Model {
}
export function PageFactory(sequelize) {
    Pages.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
    }, {
        modelName: "Pages",
        tableName: "Pages",
        timestamps: false,
        sequelize,
    });
    return Pages;
}
