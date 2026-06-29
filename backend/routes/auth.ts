import { Router } from 'express';
import { signupValidation, loginValidation } from '../validations/auth';
import handleValidationResult from '../middleware/validationResult';
import authController from '../controllers/auth';

const router = Router();

router.put('/signup', signupValidation, handleValidationResult, authController.signup);
router.post('/login', loginValidation, handleValidationResult, authController.login);

export default router;