import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// Define attributes for the Comment
interface CommentAttributes {
    id: number;
    page_id: number;
    user_id: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

export class Comments extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    declare id: number;
    declare page_id: number;
    declare user_id: number;
    declare comment: string;
    declare created_at: Date;
    declare updated_at: Date;
}

export function CommentFactory(sequelize: Sequelize): typeof Comments {
    Comments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            page_id: {
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.INTEGER,
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
