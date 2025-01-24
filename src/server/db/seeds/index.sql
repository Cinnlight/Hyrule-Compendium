-- Reset sequences
ALTER SEQUENCE page_categories_id_seq RESTART WITH 1;
ALTER SEQUENCE comments_id_seq RESTART WITH 1;
ALTER SEQUENCE content_id_seq RESTART WITH 1;
ALTER SEQUENCE reactions_id_seq RESTART WITH 1;

-- Load data in correct order to maintain referential integrity
\i users.sql
\i categories.sql
\i pages.sql
\i content.sql
\i reactions.sql
\i comments.sql

-- Update sequences to correct values after imports
SELECT setval('page_categories_id_seq', (SELECT MAX(id) FROM "Page Categories"));
SELECT setval('comments_id_seq', (SELECT MAX(id) FROM Comments));
SELECT setval('content_id_seq', (SELECT MAX(id) FROM Content));
SELECT setval('reactions_id_seq', (SELECT MAX(id) FROM Reactions));