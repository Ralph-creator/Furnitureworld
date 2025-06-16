const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
  res.json(cart || { items: [] });
});

router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
  } else {
    const index = cart.items.findIndex(item => item.productId.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  const updatedCart = await cart.save();
  res.status(200).json(updatedCart);
});

router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (cart) {
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

module.exports = router;