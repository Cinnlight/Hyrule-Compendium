export async function up(queryInterface) {
    await queryInterface.bulkInsert("Pages", [
        { id: '00000000-0000-0000-0000-000000000001', title: 'Home', slug: 'home', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
        { id: '00000000-0000-0000-0000-000000000002', title: 'Compendium', slug: 'compendium', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
        { id: '00000000-0000-0000-0000-000000000003', title: 'Forum', slug: 'forum', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
        { id: '00000000-0000-0000-0000-000000000004', title: 'Dashboard', slug: 'dashboard', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
        { id: '00000000-0000-0000-0000-000000000005', title: 'Level', slug: 'level', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
        { id: '00000000-0000-0000-0000-000000000006', title: 'Secret', slug: 'secret', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
        { id: '00000000-0000-0000-0000-000000000007', title: 'Item', slug: 'item', created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date() },
    ]);
}
export async function down(queryInterface) {
    await queryInterface.bulkDelete("Pages", {}, {});
}
