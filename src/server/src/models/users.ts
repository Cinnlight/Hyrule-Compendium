import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

// Define attributes for the User
interface UserAttributes {
    id: string;
    login: string;
    display_name: string;
    email: string;
    password: string;
    auth_level: number;
    email_val?: boolean;
    email_val_key?: string | null;
    created_at?: Date;
    updated_at?: Date;
    avatar_url?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: string;
    declare login: string;
    declare display_name: string;
    declare email: string;
    declare password: string;
    declare created_at: Date;
    declare updated_at: Date;
    declare auth_level: number;
    declare email_val: boolean;
    declare email_val_key: string | null;
    declare avatar_url: string;
}

export function UserFactory(sequelize: Sequelize): typeof Users {
    Users.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: uuidv4(),
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            display_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
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
            auth_level: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            email_val: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            email_val_key: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            avatar_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            modelName: "Users",
            tableName: "Users",
            timestamps: false,
            sequelize,
        }
    );

    return Users;
}