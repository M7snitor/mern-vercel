const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Dynamic CORS for Vercel and local development
app.use(cors({
  origin: (origin, callback) => {
    console.log('Incoming origin:', origin);
    if (
      !origin ||                      // allow server-to-server or curl requests
      origin.endsWith('.vercel.app') || // allow any Vercel preview or production
      origin === 'http://localhost:3000'
    ) {
      console.log('CORS allowed:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked for:', origin);
      callback(new Error('CORS not allowed from: ' + origin));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // optional for local file serving

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/items', require('./routes/items'));
app.use('/api/messages', require('./routes/message'));

// ✅ Optional: Debug route to inspect headers
app.get('/api/debug', (req, res) => {
  res.json({
    origin: req.get('origin'),
    headers: req.headers
  });
});

// ✅ MongoDB connection
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
