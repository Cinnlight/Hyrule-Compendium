import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Categories", [
        { id: '11111111-1111-1111-1111-111111111111', name: 'Level' },
        { id: '22222222-2222-2222-2222-222222222222', name: 'Secret' },
        { id: '33333333-3333-3333-3333-333333333333', name: 'Item' },
        { id: '44444444-4444-4444-4444-444444444444', name: 'Misc' }
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Categories", {}, {});
}
