export async function up(queryInterface) {
    // Reset sequences
    await queryInterface.sequelize.query(`ALTER SEQUENCE page_categories_id_seq RESTART WITH 1;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE comments_id_seq RESTART WITH 1;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE content_id_seq RESTART WITH 1;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE reactions_id_seq RESTART WITH 1;`);
    // Load data in correct order
    await queryInterface.bulkInsert("Users", [
        { id: 1, login: 'admin', display_name: 'Administrator', email: 'admin@example.com', password: 'hashed_password_here', avatar_url: 'https://example.com/avatars/admin.png', created_at: new Date() },
        { id: 2, login: 'johndoe', display_name: 'John Doe', email: 'john@example.com', password: 'hashed_password_here', avatar_url: 'https://example.com/avatars/john.png', created_at: new Date() },
        { id: 3, login: 'janedoe', display_name: 'Jane Doe', email: 'jane@example.com', password: 'hashed_password_here', avatar_url: 'https://example.com/avatars/jane.png', created_at: new Date() }
    ]);
    await queryInterface.bulkInsert("Page Categories", [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Science' },
        { id: 3, name: 'History' },
        { id: 4, name: 'Literature' }
    ]);
    await queryInterface.bulkInsert("Pages", [
        { id: 1, title: 'Welcome Page', slug: 'welcome', created_by: 1, created_at: new Date() },
        { id: 2, title: 'Getting Started', slug: 'getting-started', created_by: 1, created_at: new Date() },
        { id: 3, title: 'Community Guidelines', slug: 'community-guidelines', created_by: 1, created_at: new Date() }
    ]);
    await queryInterface.bulkInsert("Content", [
        { id: 1, page_id: 1, content: 'Welcome to our platform!', version: 1, created_by: 1, created_at: new Date(), contributors: 1 },
        { id: 2, page_id: 2, content: 'Here\'s how to get started...', version: 1, created_by: 1, created_at: new Date(), contributors: 1 },
        { id: 3, page_id: 3, content: 'Please follow these community guidelines...', version: 1, created_by: 1, created_at: new Date(), contributors: 1 }
    ]);
    await queryInterface.bulkInsert("Reactions", [
        { id: 1, emoji_url: 'https://example.com/emojis/like.png' },
        { id: 2, emoji_url: 'https://example.com/emojis/heart.png' },
        { id: 3, emoji_url: 'https://example.com/emojis/smile.png' }
    ]);
    await queryInterface.bulkInsert("Comments", [
        { id: 1, page_id: 1, user_id: 2, comment: 'Great introduction!', created_at: new Date(), reactions: '[[1, 5], [2, 3]]' },
        { id: 2, page_id: 2, user_id: 3, comment: 'Very helpful guide', created_at: new Date(), reactions: '[[1, 2], [3, 1]]' }
    ]);
    // Update sequences to correct values after imports
    await queryInterface.sequelize.query(`SELECT setval('page_categories_id_seq', (SELECT MAX(id) FROM "Page Categories"));`);
    await queryInterface.sequelize.query(`SELECT setval('comments_id_seq', (SELECT MAX(id) FROM Comments));`);
    await queryInterface.sequelize.query(`SELECT setval('content_id_seq', (SELECT MAX(id) FROM Content));`);
    await queryInterface.sequelize.query(`SELECT setval('reactions_id_seq', (SELECT MAX(id) FROM Reactions));`);
}
export async function down(queryInterface) {
    // Remove all seeded data
    await queryInterface.bulkDelete("Comments", {}, {});
    await queryInterface.bulkDelete("Reactions", {}, {});
    await queryInterface.bulkDelete("Content", {}, {});
    await queryInterface.bulkDelete("Pages", {}, {});
    await queryInterface.bulkDelete("Categories", {}, {});
    await queryInterface.bulkDelete("Users", {}, {});
    // Reset sequences
    await queryInterface.sequelize.query(`ALTER SEQUENCE page_categories_id_seq RESTART WITH 1;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE comments_id_seq RESTART WITH 1;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE content_id_seq RESTART WITH 1;`);
    await queryInterface.sequelize.query(`ALTER SEQUENCE reactions_id_seq RESTART WITH 1;`);
}
