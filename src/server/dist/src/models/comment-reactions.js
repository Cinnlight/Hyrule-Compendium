import { Model, DataTypes } from "sequelize";
export class CommentReactions extends Model {
}
export function CommentReactionsFactory(sequelize) {
    CommentReactions.init({
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
    }, {
        sequelize,
        modelName: "CommentReactions",
        tableName: "comment_reactions",
        timestamps: false,
    });
    return CommentReactions;
}
