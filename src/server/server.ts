import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { EmailService, EmailVerificationResult } from './src/services/noReplyEmail.js';

// Global handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Initialize database
import { initializeDatabase } from './db/database.js';

const app = express();
const PORT = process.env.PORT || 3001;
const emailService = new EmailService();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
import commentRoutes from './src/routes/comments.js';

app.use('/api/comments', commentRoutes);

// Test route
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
});

app.post('/api/verify-email', async (req: Request, res: Response) => {
  try {
    const result: EmailVerificationResult = await emailService.sendEmailVerification(req.body);
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
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