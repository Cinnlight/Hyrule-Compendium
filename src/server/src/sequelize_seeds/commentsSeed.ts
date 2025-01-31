import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Comments", [
        {
            id: '11111111-1111-1111-1111-111111111111', // manual UUID for first comment
            page_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // UUID for Welcome Page
            user_id: '22222222-2222-2222-2222-222222222222', // UUID for user2
            comment: 'Great introduction!',
            created_at: new Date(),
        },
        {
            id: '22222222-2222-2222-2222-222222222222', // manual UUID for second comment
            page_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', // UUID for Getting Started
            user_id: '33333333-3333-3333-3333-333333333333', // UUID for user3
            comment: 'Very helpful guide',
            created_at: new Date(),
        }
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Comments", {}, {});
}
