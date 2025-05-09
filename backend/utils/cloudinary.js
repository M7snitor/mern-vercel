const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  secure: true
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'kfupm-market',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

module.exports = { cloudinary, storage };
