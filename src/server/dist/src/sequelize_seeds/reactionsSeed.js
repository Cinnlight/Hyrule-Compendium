export async function up(queryInterface) {
    await queryInterface.bulkInsert("Reactions", [
        { id: 1, reaction_id: 1, emoji_url: 'https://example.com/emojis/like.png' },
        { id: 2, reaction_id: 2, emoji_url: 'https://example.com/emojis/heart.png' },
        { id: 3, reaction_id: 1, emoji_url: 'https://example.com/emojis/like.png' },
        { id: 4, reaction_id: 3, emoji_url: 'https://example.com/emojis/smile.png' },
    ]);
}
export async function down(queryInterface) {
    await queryInterface.bulkDelete("Reactions", {}, {});
}
