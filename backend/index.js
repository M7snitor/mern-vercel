const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS: allow all Vercel preview and production URLs
const allowedPattern = /^https:\/\/mern-vercel(-[\w]+)?\.m7snitors-projects\.vercel\.app$/;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedPattern.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked for: ' + origin));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // optional for dev

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/items', require('./routes/items'));
app.use('/api/messages', require('./routes/message'));

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
