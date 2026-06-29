const express = require('express');

const feedController = require('../controllers/feed');
const handleValidationResult = require('../middleware/validationResult');
const { createPostValidation, updatePostValidation } = require('../validations/feed');
const isAuth = require('../middleware/isAuth');


const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post(
  '/post',
  isAuth,
  createPostValidation,
  handleValidationResult,
  feedController.createPost
);

router.get('/post/:postId', isAuth, feedController.getPost);
router.put('/post/:postId', isAuth, updatePostValidation, handleValidationResult, feedController.updatePost);
router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;