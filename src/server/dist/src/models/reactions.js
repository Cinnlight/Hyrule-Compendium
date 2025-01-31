import { Model, DataTypes } from "sequelize";
export class Reactions extends Model {
}
export function ReactionFactory(sequelize) {
    Reactions.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        reaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        emoji_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        modelName: "Reactions",
        tableName: "Reactions",
        timestamps: false,
        sequelize,
    });
    return Reactions;
}
