import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

// Define attributes for the Comment
interface CommentAttributes {
    id: string;
    page_id: string;
    user_id: string;
    comment: string;
    created_at: Date;
    updated_at: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

export class Comments extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    declare id: string;
    declare page_id: string;
    declare user_id: string;
    declare comment: string;
    declare created_at: Date;
    declare updated_at: Date;
}

export function CommentFactory(sequelize: Sequelize): typeof Comments {
    Comments.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuidv4(),
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
        },
        {
            modelName: "Comments",
            tableName: "Comments",
            timestamps: false,
            sequelize,
        }
    );

    return Comments;
}
