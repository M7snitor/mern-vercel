const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

const {
  postItem,
  getAllItems,
  placeBid,
  updateItem,
  deleteItem,
  decrementQuantity
} = require('../controllers/itemController');

router.get('/test', (req, res) => res.send('Item route works!'));

router.post('/upload-image', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ imageUrl: req.file.path });
});

router.get('/all', getAllItems);

router.post('/post-item', auth, upload.array('images', 3), postItem);

router.post('/:itemId/bid', auth, placeBid);

router.put('/:itemId', auth, upload.array('images', 3), updateItem);

router.delete('/:itemId', auth, deleteItem);

router.put('/:itemId/decrement', auth, decrementQuantity);

module.exports = router;
