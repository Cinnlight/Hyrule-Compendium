import { Sequelize, Model, DataTypes, Optional } from "sequelize";

interface ContentContributorsAttributes {
    user_id: string;
    content_id: string;
}

interface ContentContributorsCreationAttributes extends Optional<ContentContributorsAttributes, "user_id" | "content_id"> {}

export class ContentContributors extends Model<ContentContributorsAttributes, ContentContributorsCreationAttributes> implements ContentContributorsAttributes {
    declare user_id: string;
    declare content_id: string;
}

export function ContentContributorsFactory(sequelize: Sequelize): typeof ContentContributors {
    ContentContributors.init(
        {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                primaryKey: true,
            },
            content_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Content',
                    key: 'id'
                },
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: "ContentContributors",
            tableName: "content_contributors",
            timestamps: false,
            freezeTableName: true,
        }
    );

    return ContentContributors;
}