
import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// Define attributes for the Reaction
interface ReactionAttributes {
    id: number;
    reaction_id: number;
    emoji_url: string;
}

interface ReactionCreationAttributes extends Optional<ReactionAttributes, "id"> {}

export class Reactions extends Model<ReactionAttributes, ReactionCreationAttributes> implements ReactionAttributes {
    declare id: number;
    declare reaction_id: number;
    declare emoji_url: string;
}

export function ReactionFactory(sequelize: Sequelize): typeof Reactions {
    Reactions.init(
        {
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
        },
        {
            modelName: "Reactions",
            tableName: "Reactions",
            timestamps: false,
            sequelize,
        }
    );

    return Reactions;
}