export async function up(queryInterface) {
    await queryInterface.bulkInsert("comment_reactions", [
        {
            comment_id: '11111111-1111-1111-1111-111111111111', // reaction for first comment
            reaction_id: 1,
            count: 5,
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
        },
        {
            comment_id: '11111111-1111-1111-1111-111111111111', // reaction for first comment
            reaction_id: 2,
            count: 3,
            user_id: '22222222-2222-2222-2222-222222222222', // user2
        },
        {
            comment_id: '22222222-2222-2222-2222-222222222222', // reaction for second comment
            reaction_id: 1,
            count: 2,
            user_id: '33333333-3333-3333-3333-333333333333', // user3
        },
        {
            comment_id: '22222222-2222-2222-2222-222222222222', // reaction for second comment
            reaction_id: 3,
            count: 1,
            user_id: '11111111-1111-1111-1111-111111111111', // admin user
        },
        {
            comment_id: '20000000-0000-0000-0000-000000000001', // reaction for Home comment
            reaction_id: 1,
            count: 2,
            user_id: '22222222-2222-2222-2222-222222222222',
        },
        {
            comment_id: '20000000-0000-0000-0000-000000000002', // reaction for Compendium comment
            reaction_id: 1,
            count: 3,
            user_id: '33333333-3333-3333-3333-333333333333',
        },
        {
            comment_id: '20000000-0000-0000-0000-000000000003', // reaction for Forum comment
            reaction_id: 2,
            count: 1,
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            comment_id: '20000000-0000-0000-0000-000000000004', // reaction for Dashboard comment
            reaction_id: 2,
            count: 4,
            user_id: '22222222-2222-2222-2222-222222222222',
        },
        {
            comment_id: '20000000-0000-0000-0000-000000000005', // reaction for Level comment
            reaction_id: 3,
            count: 2,
            user_id: '33333333-3333-3333-3333-333333333333',
        },
        {
            comment_id: '20000000-0000-0000-0000-000000000006', // reaction for Secret comment
            reaction_id: 1,
            count: 1,
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            comment_id: '20000000-0000-0000-0000-000000000007', // reaction for Item comment
            reaction_id: 3,
            count: 1,
            user_id: '22222222-2222-2222-2222-222222222222',
        },
    ]);
}
export async function down(queryInterface) {
    await queryInterface.bulkDelete("comment_reactions", {}, {});
}
