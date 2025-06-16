const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// @POST /api/products
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, price } = req.body;
    const imagePath = req.file.filename;

    const product = new Product({ title, price, image: imagePath });
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;
