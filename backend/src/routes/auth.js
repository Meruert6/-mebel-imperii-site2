// backend/src/routes/auth.js

import express from 'express';
import { body } from 'express-validator';
import { loginAdmin, registerAdmin } from '../controllers/authController.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars')
  ],
  validateRequest,
  loginAdmin
);

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
    body('name').optional().isString()
  ],
  validateRequest,
  registerAdmin
);

export default router;

