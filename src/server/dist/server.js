import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './src/routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Global handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
// Initialize database
import { initializeDatabase } from './db/database.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Routes
app.use('/', routes);
// Serve static files
app.use(express.static(path.join(__dirname, '../public_html')));
// Serve index.html for all routes not handled by the API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public_html/index.html'));
});
// Initialize database and start the server
initializeDatabase()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Failed to initialize database. Server not started.', err);
    process.exit(1); // Exit the process on failure
});
export default app;
