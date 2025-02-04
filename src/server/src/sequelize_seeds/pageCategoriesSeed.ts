import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Page Categories", [
        { page_id: '00000000-0000-0000-0000-000000000001', category_id: '44444444-4444-4444-4444-444444444444' }, // Home => Misc
        { page_id: '00000000-0000-0000-0000-000000000002', category_id: '44444444-4444-4444-4444-444444444444' }, // Compendium => Misc
        { page_id: '00000000-0000-0000-0000-000000000003', category_id: '44444444-4444-4444-4444-444444444444' }, // Forum => Misc
        { page_id: '00000000-0000-0000-0000-000000000004', category_id: '44444444-4444-4444-4444-444444444444' }, // Dashboard => Misc
        { page_id: '00000000-0000-0000-0000-000000000005', category_id: '11111111-1111-1111-1111-111111111111' }, // Level => Level
        { page_id: '00000000-0000-0000-0000-000000000006', category_id: '22222222-2222-2222-2222-222222222222' }, // Secret => Secret
        { page_id: '00000000-0000-0000-0000-000000000007', category_id: '33333333-3333-3333-3333-333333333333' }, // Item => Item
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Page Categories", {});
}