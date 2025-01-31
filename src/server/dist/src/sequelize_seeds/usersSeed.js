export async function up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
        {
            id: '11111111-1111-1111-1111-111111111111',
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
            id: '22222222-2222-2222-2222-222222222222',
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
            id: '33333333-3333-3333-3333-333333333333',
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
export async function down(queryInterface) {
    await queryInterface.bulkDelete("Users", {}, {});
}
