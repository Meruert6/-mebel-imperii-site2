// backend/src/routes/categories.js

import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', listCategories);

router.post(
  '/',
  requireAuth,
  [body('name').isString().notEmpty().withMessage('Name is required')],
  validateRequest,
  createCategory
);

router.put(
  '/:id',
  requireAuth,
  [body('name').isString().notEmpty().withMessage('Name is required')],
  validateRequest,
  updateCategory
);

router.delete('/:id', requireAuth, deleteCategory);

export default router;
