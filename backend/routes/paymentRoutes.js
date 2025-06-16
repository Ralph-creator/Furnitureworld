const express = require('express');
// const Stripe = require('stripe');
const auth = require('../middleware/auth');
const router = express.Router();

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', auth, async (req, res) => {
  const { items } = req.body;

  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name
      },
      unit_amount: item.price * 100
    },
    quantity: item.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:5500/success',
    cancel_url: 'http://localhost:5500/cancel'
  });

  res.json({ id: session.id });
});

module.exports = router;