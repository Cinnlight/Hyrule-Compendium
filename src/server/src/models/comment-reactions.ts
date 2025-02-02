import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface CommentReactionsAttributes {
    comment_id: string;
    reaction_id: number;
    user_id: string; // added field
    count: number;
}

interface CommentReactionsCreationAttributes extends Optional<CommentReactionsAttributes, "comment_id" | "reaction_id" | "user_id"> {}

export class CommentReactions extends Model<CommentReactionsAttributes, CommentReactionsCreationAttributes> implements CommentReactionsAttributes {
    declare comment_id: string;
    declare reaction_id: number;
    declare user_id: string; // added field
    declare count: number;
}

export function CommentReactionsFactory(sequelize: Sequelize): typeof CommentReactions {
    CommentReactions.init(
        {
            comment_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Comments',
                    key: 'id'
                }
            },
            reaction_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            count: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: "CommentReactions",
            tableName: "comment_reactions",
            timestamps: false,
        }
    );

    return CommentReactions;
}