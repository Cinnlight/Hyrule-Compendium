import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Categories", [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Science' },
        { id: 3, name: 'History' },
        { id: 4, name: 'Literature' }
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Categories", {}, {});
}
