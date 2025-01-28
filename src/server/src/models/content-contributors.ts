
import { Sequelize, Model, DataTypes, Optional } from "sequelize";

interface ContentContributorsAttributes {
    user_id: number;
    content_id: number;
}

interface ContentContributorsCreationAttributes extends Optional<ContentContributorsAttributes, "user_id" | "content_id"> {}

export class ContentContributors extends Model<ContentContributorsAttributes, ContentContributorsCreationAttributes> implements ContentContributorsAttributes {
    declare user_id: number;
    declare content_id: number;
}

export function ContentContributorsFactory(sequelize: Sequelize): typeof ContentContributors {
    ContentContributors.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            content_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Content',
                    key: 'id'
                }
            },
        },
        {
            sequelize,
            modelName: "ContentContributors",
            tableName: "content_contributors",
            timestamps: false,
        }
    );

    return ContentContributors;
}