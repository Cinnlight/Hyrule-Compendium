import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Reactions", [
        { id: 1, comment_id: 1, reaction_id: 1, emoji_url: 'https://example.com/emojis/like.png', count: 5 },
        { id: 2, comment_id: 1, reaction_id: 2, emoji_url: 'https://example.com/emojis/heart.png', count: 3 },
        { id: 3, comment_id: 2, reaction_id: 1, emoji_url: 'https://example.com/emojis/like.png', count: 2 },
        { id: 4, comment_id: 2, reaction_id: 3, emoji_url: 'https://example.com/emojis/smile.png', count: 1 },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Reactions", {}, {});
}