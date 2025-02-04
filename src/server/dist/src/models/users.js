import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
export class Users extends Model {
}
export function UserFactory(sequelize) {
    Users.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4(),
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
    }, {
        modelName: "Users",
        tableName: "Users",
        timestamps: false,
        sequelize,
    });
    return Users;
}
