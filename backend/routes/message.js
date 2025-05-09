const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

const {
  sendMessage,
  getMessages,
  getConversations
} = require('../controllers/messageController');

router.post('/', auth, sendMessage);
router.post('/send', auth, sendMessage);

router.post('/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ imageUrl: req.file.path });
});

router.get('/conversations', auth, getConversations);
router.get('/:withUserId', auth, getMessages);

module.exports = router;
