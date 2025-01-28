import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Reactions", [
        { id: 1, emoji_url: 'https://example.com/emojis/like.png' },
        { id: 2, emoji_url: 'https://example.com/emojis/heart.png' },
        { id: 3, emoji_url: 'https://example.com/emojis/smile.png' },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Reactions", {}, {});
}