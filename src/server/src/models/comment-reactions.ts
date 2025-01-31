import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

interface CommentReactionsAttributes {
    comment_id: string;
    reaction_id: number;
    count: number;
}

interface CommentReactionsCreationAttributes extends Optional<CommentReactionsAttributes, "comment_id" | "reaction_id"> {}

export class CommentReactions extends Model<CommentReactionsAttributes, CommentReactionsCreationAttributes> implements CommentReactionsAttributes {
    declare comment_id: string;
    declare reaction_id: number;
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