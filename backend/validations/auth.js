const { body } = require('express-validator');

exports.signupValidation = [
  body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long.'),
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.'),
];

exports.loginValidation = [
  body('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long.'),
];