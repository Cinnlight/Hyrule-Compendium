import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Users", [
        {
            id: 1,
            login: 'admin',
            display_name: 'Administrator',
            email: 'admin@example.com',
            password: 'hashed_password_here',
            avatar_url: 'https://example.com/avatars/admin.png',
            created_at: new Date(),
            updated_at: new Date(),
            auth_level: 1,
        },
        {
            id: 2,
            login: 'johndoe',
            display_name: 'John Doe',
            email: 'john@example.com',
            password: 'hashed_password_here',
            avatar_url: 'https://example.com/avatars/john.png',
            created_at: new Date(),
            updated_at: new Date(),
            auth_level: 1,
        },
        {
            id: 3,
            login: 'janedoe',
            display_name: 'Jane Doe',
            email: 'jane@example.com',
            password: 'hashed_password_here',
            avatar_url: 'https://example.com/avatars/jane.png',
            created_at: new Date(),
            updated_at: new Date(),
            auth_level: 1,
        },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Users", {}, {});
}