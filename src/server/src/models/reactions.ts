
import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// Define attributes for the Reaction
interface ReactionAttributes {
    id: number;
    comment_id: number;
    reaction_id: number;
    emoji_url: string;
    count?: number;
}

interface ReactionCreationAttributes extends Optional<ReactionAttributes, "id"> {}

export class Reactions extends Model<ReactionAttributes, ReactionCreationAttributes> implements ReactionAttributes {
    public id!: number;
    public comment_id!: number;
    public reaction_id!: number;
    public emoji_url!: string;
    public count?: number;
}

export function ReactionFactory(sequelize: Sequelize): typeof Reactions {
    Reactions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            comment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            reaction_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            emoji_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            }
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