import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

// Define attributes for the Page
interface PageAttributes {
    id: string;
    title: string;
    slug: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
}

interface PageCreationAttributes extends Optional<PageAttributes, "id"> {}

export class Pages extends Model<PageAttributes, PageCreationAttributes> implements PageAttributes {
    declare id: string;
    declare title: string;
    declare slug: string;
    declare created_by: string;
    declare created_at: Date;
    declare updated_at: Date;
}

export function PageFactory(sequelize: Sequelize): typeof Pages {
    Pages.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: () => uuidv4(),
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            created_by: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        },
        {
            modelName: "Pages",
            tableName: "Pages",
            timestamps: false,
            sequelize,
        }
    );

    return Pages;
}
