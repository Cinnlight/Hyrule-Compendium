import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Content", [
        { id: 1, page_id: 1, content: 'Welcome to our platform!', version: 1, created_by: 1, created_at: new Date(), updated_at: new Date(), verified_at: null, verified_by: null },
        { id: 2, page_id: 2, content: 'Here\'s how to get started...', version: 1, created_by: 1, created_at: new Date(), updated_at: new Date(), verified_at: null, verified_by: null },
        { id: 3, page_id: 3, content: 'Please follow these community guidelines...', version: 1, created_by: 1, created_at: new Date(), updated_at: new Date(), verified_at: null, verified_by: null },
    ]);
    await queryInterface.bulkInsert("content_contributors", [
        { content_id: 1, user_id: 1 },
        { content_id: 2, user_id: 1 },
        { content_id: 3, user_id: 1 },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("content_contributors", {}, {});
    await queryInterface.bulkDelete("Content", {}, {});
}