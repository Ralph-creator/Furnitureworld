const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = connectDB;