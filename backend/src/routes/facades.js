// backend/src/routes/facades.js

import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  listFacades,
  createFacade,
  updateFacade,
  deleteFacade
} from '../controllers/facadeController.js';

const router = express.Router();

router.get('/', listFacades);

router.post(
  '/',
  requireAuth,
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('imageUrls').optional().isArray()
  ],
  validateRequest,
  createFacade
);

router.put(
  '/:id',
  requireAuth,
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('imageUrls').optional().isArray()
  ],
  validateRequest,
  updateFacade
);

router.delete('/:id', requireAuth, deleteFacade);

export default router;
