import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
export class Comments extends Model {
}
export function CommentFactory(sequelize) {
    Comments.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        page_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Pages',
                key: 'id'
            },
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    }, {
        modelName: "Comments",
        tableName: "Comments",
        timestamps: false,
        sequelize,
    });
    return Comments;
}
