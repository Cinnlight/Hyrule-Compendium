export async function up(queryInterface) {
    await queryInterface.bulkInsert("Content", [
        { id: '88888888-8888-8888-8888-888888888888', page_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', content: 'Welcome to our platform!', version: 1, created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date(), verified_at: null, verified_by: null },
        { id: '99999999-9999-9999-9999-999999999999', page_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', content: 'Here\'s how to get started...', version: 1, created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date(), verified_at: null, verified_by: null },
        { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', page_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', content: 'Please follow these community guidelines...', version: 1, created_by: '11111111-1111-1111-1111-111111111111', created_at: new Date(), updated_at: new Date(), verified_at: null, verified_by: null },
    ]);
    await queryInterface.bulkInsert("content_contributors", [
        { content_id: '88888888-8888-8888-8888-888888888888', user_id: '11111111-1111-1111-1111-111111111111' },
        { content_id: '99999999-9999-9999-9999-999999999999', user_id: '11111111-1111-1111-1111-111111111111' },
        { content_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', user_id: '11111111-1111-1111-1111-111111111111' },
    ]);
}
export async function down(queryInterface) {
    await queryInterface.bulkDelete("content_contributors", {}, {});
    await queryInterface.bulkDelete("Content", {}, {});
}
