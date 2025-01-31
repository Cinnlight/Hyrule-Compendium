import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
export class Content extends Model {
}
export function ContentFactory(sequelize) {
    Content.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuidv4(),
        },
        page_id: {
            type: DataTypes.UUID, // Changed from DataTypes.INTEGER to DataTypes.UUID
            allowNull: false,
            references: {
                model: 'Pages',
                key: 'id'
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        version: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        created_by: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        verified_at: {
            type: DataTypes.DATE,
        },
        verified_by: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
    }, {
        modelName: "Content",
        tableName: "Content",
        timestamps: false,
        sequelize,
    });
    return Content;
}
