const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String, // this line of code stores the filename
});

module.exports = mongoose.model('Product', ProductSchema);
