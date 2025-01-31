export async function up(queryInterface) {
    await queryInterface.bulkInsert("comment_reactions", [
        { comment_id: '11111111-1111-1111-1111-111111111111', reaction_id: 1, count: 5 }, // 👍 used 5 times on comment 1
        { comment_id: '11111111-1111-1111-1111-111111111111', reaction_id: 2, count: 3 }, // ❤️ used 3 times on comment 1
        { comment_id: '22222222-2222-2222-2222-222222222222', reaction_id: 1, count: 2 }, // 👍 used 2 times on comment 2
        { comment_id: '22222222-2222-2222-2222-222222222222', reaction_id: 3, count: 1 }, // 😂 used 1 time on comment 2
    ]);
}
export async function down(queryInterface) {
    await queryInterface.bulkDelete("comment_reactions", {}, {});
}
