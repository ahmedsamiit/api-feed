import { Router } from 'express';
import { createPostValidation, updatePostValidation } from '../validations/feed';
import isAuth from '../middleware/isAuth';
import feedController from '../controllers/feed';
import handleValidationResult from '../middleware/validationResult';

const router = Router();

router.get('/posts', isAuth, feedController.getPosts);
router.post('/post', isAuth, createPostValidation, handleValidationResult, feedController.createPost);
router.get('/post/:postId', isAuth, feedController.getPost);
router.put('/post/:postId', isAuth, updatePostValidation, handleValidationResult, feedController.updatePost);
router.delete('/post/:postId', isAuth, feedController.deletePost);

export default router;