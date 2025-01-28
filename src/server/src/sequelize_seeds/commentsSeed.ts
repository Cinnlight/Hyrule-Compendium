import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Comments", [
        {
            id: 1,
            page_id: 1,
            user_id: 2,
            comment: 'Great introduction!',
            created_at: new Date(),
        },
        {
            id: 2,
            page_id: 2,
            user_id: 3,
            comment: 'Very helpful guide',
            created_at: new Date(),
        }
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Comments", {}, {});
}
