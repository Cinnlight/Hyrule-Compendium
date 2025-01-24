import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Pages", [
        { id: 1, title: 'Welcome Page', slug: 'welcome', created_by: 1, created_at: new Date(), updated_at: new Date() },
        { id: 2, title: 'Getting Started', slug: 'getting-started', created_by: 1, created_at: new Date(), updated_at: new Date() },
        { id: 3, title: 'Community Guidelines', slug: 'community-guidelines', created_by: 1, created_at: new Date(), updated_at: new Date() },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Pages", {}, {});
}