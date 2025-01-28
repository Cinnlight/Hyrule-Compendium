import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// Define attributes for the Page
interface PageAttributes {
    id: number;
    title: string;
    slug: string;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

interface PageCreationAttributes extends Optional<PageAttributes, "id"> {}

export class Pages extends Model<PageAttributes, PageCreationAttributes> implements PageAttributes {
    declare id: number;
    declare title: string;
    declare slug: string;
    declare created_by: number;
    declare created_at: Date;
    declare updated_at: Date;
}

export function PageFactory(sequelize: Sequelize): typeof Pages {
    Pages.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
                type: DataTypes.INTEGER,
                allowNull: false,
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
