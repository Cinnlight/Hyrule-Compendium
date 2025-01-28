
import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// Define attributes for the Reaction
interface ReactionAttributes {
    id: number;
    emoji_url: string;
}

interface ReactionCreationAttributes extends Optional<ReactionAttributes, "id"> {}

export class Reactions extends Model<ReactionAttributes, ReactionCreationAttributes> implements ReactionAttributes {
    public id!: number;
    public emoji_url!: string;
}

export function ReactionFactory(sequelize: Sequelize): typeof Reactions {
    Reactions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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