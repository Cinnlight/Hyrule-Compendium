import { Sequelize, Model, DataTypes, Optional } from "sequelize";

// Define attributes for the User
interface UserAttributes {
    id: number;
    login: string;
    display_name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    auth_level: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class Users extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public login!: string;
    public display_name!: string;
    public email!: string;
    public password!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public auth_level!: number;
}

export function UserFactory(sequelize: Sequelize): typeof Users {
    Users.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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