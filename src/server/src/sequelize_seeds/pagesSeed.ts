import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Pages", [
        { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', title: 'Welcome Page', slug: 'welcome', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
        { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', title: 'Getting Started', slug: 'getting-started', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
        { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', title: 'Community Guidelines', slug: 'community-guidelines', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Pages", {}, {});
}