import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// Define attributes for the Content
interface ContentAttributes {
    id: number;
    page_id: number;
    content: string;
    version?: number;
    created_by?: number;
    created_at?: Date;
    updated_at?: Date;
    contributors?: number[];
    verified_at?: Date;
    verified_by?: number;
}

interface ContentCreationAttributes extends Optional<ContentAttributes, "id"> {}

export class Content extends Model<ContentAttributes, ContentCreationAttributes> implements ContentAttributes {
    public id!: number;
    public page_id!: number;
    public content!: string;
    public version!: number;
    public created_by!: number;
    public created_at!: Date;
    public updated_at!: Date;
    public contributors!: number[];
    public verified_at!: Date;
    public verified_by!: number;
}

export function ContentFactory(sequelize: Sequelize): typeof Content {
    Content.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            page_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                // ON DELETE CASCADE
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            version: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            created_by: {
                type: DataTypes.INTEGER,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            contributors: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
            },
            verified_at: {
                type: DataTypes.DATE,
            },
            verified_by: {
                type: DataTypes.INTEGER,
            },
        },
        {
            modelName: "Content",
            tableName: "Content",
            timestamps: false,
            sequelize,
        }
    );

    return Content;
}
