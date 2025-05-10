const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config(); // Load .env variables

// Debug check for missing CLOUDINARY_URL
if (!process.env.CLOUDINARY_URL) {
  console.error('❌ CLOUDINARY_URL not found in environment');
}

cloudinary.config({
  secure: true,
  cloudinary_url: process.env.CLOUDINARY_URL
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'kfupm-market',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  }
});

module.exports = { cloudinary, storage };
