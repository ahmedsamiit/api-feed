const userService = require('../domain/service/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  const userData = req.body;
  userData.password = await bcrypt.hash(userData.password, 12).then(
  ).catch(err => {
    next(err);
  });
  const user = await userService.createUser(userData);
  res.status(201).json({ message: 'User created successfully!', userId: user._id });
};

exports.login = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userService.getUserByEmail(userData.email);

    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(userData.password, user.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      'secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'User logged in successfully!',
      userId: user._id,
      token: token
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};