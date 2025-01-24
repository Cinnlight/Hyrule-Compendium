INSERT INTO Users (id, login, display_name, email, password, avatar_url, created_at) VALUES 
(1, 'admin', 'Administrator', 'admin@example.com', 'hashed_password_here', 'https://example.com/avatars/admin.png', NOW()),
(2, 'johndoe', 'John Doe', 'john@example.com', 'hashed_password_here', 'https://example.com/avatars/john.png', NOW()),
(3, 'janedoe', 'Jane Doe', 'jane@example.com', 'hashed_password_here', 'https://example.com/avatars/jane.png', NOW());