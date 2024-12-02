import express from 'express';
import cors from 'cors';
import { rsvpRouter } from './routes/rsvp.js';
import { initializeDatabase } from './database/init.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initializeDatabase();

// Routes
app.use('/api/rsvp', rsvpRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});