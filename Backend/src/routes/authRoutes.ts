import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { registerValidation, loginValidation } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import { uploadFields } from '../middleware/upload';

const router = Router();

// Public routes
router.post('/register', uploadFields, registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

export default router;
