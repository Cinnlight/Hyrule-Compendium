import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("comment_reactions", [
        { comment_id: '11111111-1111-1111-1111-111111111111', reaction_id: 1, count: 5, user_id: '11111111-1111-1111-1111-111111111111' }, // e.g., admin
        { comment_id: '11111111-1111-1111-1111-111111111111', reaction_id: 2, count: 3, user_id: '22222222-2222-2222-2222-222222222222' }, // e.g., John Doe
        { comment_id: '22222222-2222-2222-2222-222222222222', reaction_id: 1, count: 2, user_id: '33333333-3333-3333-3333-333333333333' }, // e.g., Jane Doe
        { comment_id: '22222222-2222-2222-2222-222222222222', reaction_id: 3, count: 1, user_id: '11111111-1111-1111-1111-111111111111' }, // e.g., admin again
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("comment_reactions", {}, {});
}