
import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Page Categories", [
        { page_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', category_id: '11111111-1111-1111-1111-111111111111' },
        { page_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', category_id: '22222222-2222-2222-2222-222222222222' },
        { page_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', category_id: '33333333-3333-3333-3333-333333333333' },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Page Categories", {});
}