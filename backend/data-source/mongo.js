const mongoose = require('mongoose');
const env = require('../config/config');

const connectDB = async () => {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected successfully');
};

module.exports = connectDB;