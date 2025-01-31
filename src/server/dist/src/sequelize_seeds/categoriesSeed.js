import { v4 as uuidv4 } from 'uuid';
export async function up(queryInterface) {
    await queryInterface.bulkInsert("Categories", [
        { id: uuidv4(), name: 'Technology' },
        { id: uuidv4(), name: 'Science' },
        { id: uuidv4(), name: 'History' },
        { id: uuidv4(), name: 'Literature' }
    ]);
}
export async function down(queryInterface) {
    await queryInterface.bulkDelete("Categories", {}, {});
}
