import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

// Define attributes for the Content
interface ContentAttributes {
    id: string;
    page_id: string; // Changed from number to string
    content: string;
    version?: number;
    created_by?: string;
    created_at?: Date;
    updated_at?: Date;
    verified_at?: Date;
    verified_by?: string;
}

interface ContentCreationAttributes extends Optional<ContentAttributes, "id"> {}

export class Content extends Model<ContentAttributes, ContentCreationAttributes> implements ContentAttributes {
    declare id: string;
    declare page_id: string; // Changed from number to string
    declare content: string;
    declare version: number;
    declare created_by: string;
    declare created_at: Date;
    declare updated_at: Date;
    declare verified_at: Date;
    declare verified_by: string;
}

export function ContentFactory(sequelize: Sequelize): typeof Content {
    Content.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuidv4(),
            },
            page_id: {
                type: DataTypes.UUID, // Changed from DataTypes.INTEGER to DataTypes.UUID
                allowNull: false,
                references: {
                    model: 'Pages',
                    key: 'id'
                },
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
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            verified_at: {
                type: DataTypes.DATE,
            },
            verified_by: {
                type: DataTypes.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                },
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
