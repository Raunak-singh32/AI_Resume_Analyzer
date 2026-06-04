const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

const app = express();
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' }
});

const analyzeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { message: 'Analysis limit reached, please try again after an hour.' }
});

// Middleware FIRST
app.use(express.json());
app.use(cors({
  origin: [
   'http://localhost:5173',
    process.env.CLIENT_URL
  ],
  credentials: true
}));
app.use(limiter);
app.use('/api/resume/analyze', analyzeLimiter);

// Routes AFTER middleware
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'AI Resume Analyzer API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB();