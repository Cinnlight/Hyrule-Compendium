import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert("Content", [
        {
            id: '88888888-8888-8888-8888-888888888888', // placeholder for Welcome Page content
            page_id: '00000000-0000-0000-0000-000000000001',
            content: 'Welcome to our platform!',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: '99999999-9999-9999-9999-999999999999', // placeholder for getting started content on Welcome Page
            page_id: '00000000-0000-0000-0000-000000000001',
            content: 'Here\'s how to get started...',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // placeholder for Community Guidelines content
            page_id: '00000000-0000-0000-0000-000000000001',
            content: 'Please follow these community guidelines...',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: '10000000-0000-0000-0000-000000000001', // new placeholder content for Home page
            page_id: '00000000-0000-0000-0000-000000000001',
            content: 'Placeholder content for Home page.',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: '10000000-0000-0000-0000-000000000002', // new placeholder content for Compendium page
            page_id: '00000000-0000-0000-0000-000000000002',
            content: 'Placeholder content for Compendium page.',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: '10000000-0000-0000-0000-000000000003', // new placeholder content for Forum page
            page_id: '00000000-0000-0000-0000-000000000003',
            content: 'Placeholder content for Forum page.',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: '10000000-0000-0000-0000-000000000004', // new placeholder content for Dashboard page
            page_id: '00000000-0000-0000-0000-000000000004',
            content: 'Placeholder content for Dashboard page.',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: '10000000-0000-0000-0000-000000000005', // new placeholder content for Level page
            page_id: '00000000-0000-0000-0000-000000000005',
            content: 'Placeholder content for Level page.',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: '10000000-0000-0000-0000-000000000006', // new placeholder content for Secret page
            page_id: '00000000-0000-0000-0000-000000000006',
            content: 'Placeholder content for Secret page.',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
        {
            id: '10000000-0000-0000-0000-000000000007', // new placeholder content for Item page
            page_id: '00000000-0000-0000-0000-000000000007',
            content: 'Placeholder content for Item page.',
            version: 1,
            created_by: '11111111-1111-1111-1111-111111111111',
            created_at: new Date(),
            updated_at: new Date(),
            verified_at: null,
            verified_by: null,
        },
    ]);

    await queryInterface.bulkInsert("content_contributors", [
        {
            content_id: '88888888-8888-8888-8888-888888888888', // contributor for Welcome Page content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: '99999999-9999-9999-9999-999999999999', // contributor for Getting Started content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // contributor for Community Guidelines content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: '10000000-0000-0000-0000-000000000001', // contributor for Home page content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: '10000000-0000-0000-0000-000000000002', // contributor for Compendium page content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: '10000000-0000-0000-0000-000000000003', // contributor for Forum page content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: '10000000-0000-0000-0000-000000000004', // contributor for Dashboard page content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: '10000000-0000-0000-0000-000000000005', // contributor for Level page content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: '10000000-0000-0000-0000-000000000006', // contributor for Secret page content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
        {
            content_id: '10000000-0000-0000-0000-000000000007', // contributor for Item page content
            user_id: '11111111-1111-1111-1111-111111111111',
        },
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("content_contributors", {}, {});
    await queryInterface.bulkDelete("Content", {}, {});
}