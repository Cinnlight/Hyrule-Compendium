
import { Sequelize, Model, DataTypes, Optional } from "sequelize";

interface CommentReactionsAttributes {
    comment_id: number;
    reaction_id: number;
    count: number;
}

interface CommentReactionsCreationAttributes extends Optional<CommentReactionsAttributes, "comment_id" | "reaction_id"> {}

export class CommentReactions extends Model<CommentReactionsAttributes, CommentReactionsCreationAttributes> implements CommentReactionsAttributes {
    declare comment_id: number;
    declare reaction_id: number;
    declare count: number;
}

export function CommentReactionsFactory(sequelize: Sequelize): typeof CommentReactions {
    CommentReactions.init(
        {
            comment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Comments',
                    key: 'id'
                }
            },
            reaction_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Reactions',
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