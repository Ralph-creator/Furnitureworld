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

// @POST /api/products - Add new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, price } = req.body;
    const imagePath = req.file.filename;

    const product = new Product({ title, price, image: imagePath });
    await product.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: {
        _id: product._id,
        title: product.title,
        price: product.price,
        imageUrl: `${req.protocol}://${req.get('host')}/uploads/${product.image}`
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// @GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    const updated = products.map(p => ({
      _id: p._id,
      title: p.title,
      price: p.price,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${p.image}`
    }));

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
