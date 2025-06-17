const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// Create a new contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// ✅ Get all contact messages (for admin inbox)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

module.exports = router;
