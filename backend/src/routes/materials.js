// backend/src/routes/materials.js

import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  listMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from '../controllers/materialController.js';

const router = express.Router();

router.get('/', listMaterials);

router.post(
  '/',
  requireAuth,
  [body('name').isString().notEmpty().withMessage('Name is required')],
  validateRequest,
  createMaterial
);

router.put(
  '/:id',
  requireAuth,
  [body('name').isString().notEmpty().withMessage('Name is required')],
  validateRequest,
  updateMaterial
);

router.delete('/:id', requireAuth, deleteMaterial);

export default router;
