const express = require('express');
const { signupValidation, loginValidation } = require('../validations/auth');
const handleValidationResult = require('../middleware/validationResult');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', signupValidation, handleValidationResult, authController.signup);
router.post('/login', loginValidation, handleValidationResult, authController.login);

module.exports = router;