import { Model, DataTypes } from "sequelize";
export class ContentContributors extends Model {
}
export function ContentContributorsFactory(sequelize) {
    ContentContributors.init({
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
    }, {
        sequelize,
        modelName: "ContentContributors",
        tableName: "content_contributors",
        timestamps: false,
        freezeTableName: true,
    });
    return ContentContributors;
}
