import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Comments", [
        {
            id: '11111111-1111-1111-1111-111111111111', // manual UUID for first comment
            page_id: '00000000-0000-0000-0000-000000000001', // UUID for Home Page
            user_id: '22222222-2222-2222-2222-222222222222', // UUID for user2
            comment: 'Great introduction!',
            created_at: new Date(),
        },
        {
            id: '22222222-2222-2222-2222-222222222222', // manual UUID for second comment
            page_id: '00000000-0000-0000-0000-000000000001', // UUID for Getting Started
            user_id: '33333333-3333-3333-3333-333333333333', // UUID for user3
            comment: 'Very helpful guide',
            created_at: new Date(),
        },
        {
            id: '20000000-0000-0000-0000-000000000001', // new comment for Home page
            page_id: '00000000-0000-0000-0000-000000000001', // UUID for Home page
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
            comment: 'Awesome Home page!',
            created_at: new Date(),
        },
        {
            id: '20000000-0000-0000-0000-000000000002', // new comment for Compendium page
            page_id: '00000000-0000-0000-0000-000000000002', // UUID for Compendium page
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
            comment: 'Loving the Compendium!',
            created_at: new Date(),
        },
        {
            id: '20000000-0000-0000-0000-000000000003', // new comment for Forum page
            page_id: '00000000-0000-0000-0000-000000000003', // UUID for Forum page
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
            comment: 'Forum looks great!',
            created_at: new Date(),
        },
        {
            id: '20000000-0000-0000-0000-000000000004', // new comment for Dashboard page
            page_id: '00000000-0000-0000-0000-000000000004', // UUID for Dashboard page
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
            comment: 'Dashboard is user friendly!',
            created_at: new Date(),
        },
        {
            id: '20000000-0000-0000-0000-000000000005', // new comment for Level page
            page_id: '00000000-0000-0000-0000-000000000005', // UUID for Level page
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
            comment: 'Level page is intriguing!',
            created_at: new Date(),
        },
        {
            id: '20000000-0000-0000-0000-000000000006', // new comment for Secret page
            page_id: '00000000-0000-0000-0000-000000000006', // UUID for Secret page
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
            comment: 'Secret page is mysterious!',
            created_at: new Date(),
        },
        {
            id: '20000000-0000-0000-0000-000000000007', // new comment for Item page
            page_id: '00000000-0000-0000-0000-000000000007', // UUID for Item page
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
            comment: 'Item page has cool collectibles!',
            created_at: new Date(),
        },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Comments", {}, {});
}
