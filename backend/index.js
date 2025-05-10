const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS whitelist for all your Vercel domains
const allowedOrigins = [
  'https://mern-vercel-lovat.vercel.app',
  'https://mern-vercel-m7snitors-projects.vercel.app',
  'https://mern-vercel-git-main-m7snitors-projects.vercel.app',
  'https://mern-vercel-m95fzu7jj-m7snitors-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked for: ' + origin));
    }
  },
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Optional: serve uploaded files (if used for local dev only)
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/items', require('./routes/items'));
app.use('/api/messages', require('./routes/message'));

// ✅ MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Stop app if DB fails
  }
};

connectDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
