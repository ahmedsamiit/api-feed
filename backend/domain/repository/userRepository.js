const User = require('../models/user');

exports.create = (userData) => {
  return User.create(userData);
};

exports.findByEmail = (email) => {
  return User.findOne({ email: email });
};

exports.findById = (id) => {
  return User.findById(id);
};