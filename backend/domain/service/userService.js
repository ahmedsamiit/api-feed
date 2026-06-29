const userRepository = require('../repository/userRepository');

exports.createUser = (userData) => {
  return userRepository.create(userData);
};

exports.getUserByEmail = (email) => {
  return userRepository.findByEmail(email);
};

exports.getUserById = (id) => {
  return userRepository.findById(id);
};