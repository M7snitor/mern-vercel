const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving (won’t work for uploads on Vercel — now using Cloudinary)
app.use('/uploads', express.static('uploads')); // okay to leave for dev/testing

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/items', require('./routes/items')); // ← Item routes using Cloudinary
app.use('/api/messages', require('./routes/message'));

// MongoDB connection (prevent multiple connections)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

connectDB();

module.exports = app; // Export app for Vercel serverless deployment