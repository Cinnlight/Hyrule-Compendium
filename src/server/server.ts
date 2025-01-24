import express from 'express';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// initializeDatabase contains all seed functions and the sequelize.sync() function
import { initializeDatabase } from './db/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Test route
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
});

// TODO: Initialize database and start the server - currently not working - issue with run dev script and expemental loader
// initializeDatabase()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to initialize database. Server not started.", err);
//     process.exit(1); // Exit the process with failure
//   });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;