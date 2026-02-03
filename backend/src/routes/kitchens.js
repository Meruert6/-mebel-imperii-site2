// backend/src/routes/kitchens.js

import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  listKitchens,
  getKitchen,
  createKitchen,
  updateKitchen,
  deleteKitchen
} from '../controllers/kitchenController.js';

const router = express.Router();

router.get('/', listKitchens);
router.get('/:id', getKitchen);

router.post(
  '/',
  requireAuth,
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').optional().isString(),
    body('priceFrom')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('priceFrom must be a number'),
    body('priceOriginal')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('priceOriginal must be a number'),
    body('priceDiscount')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('priceDiscount must be a number'),
    body('discountPercent')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('discountPercent must be a number'),
    body('videoUrl').optional().isString(),
    body('categoryId')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('categoryId must be a number'),
    body('materialIds').optional().isArray(),
    body('facadeIds').optional().isArray(),
    body('imageUrls').optional().isArray()
  ],
  validateRequest,
  createKitchen
);

router.put(
  '/:id',
  requireAuth,
  [
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('priceFrom')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('priceFrom must be a number'),
    body('priceOriginal')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('priceOriginal must be a number'),
    body('priceDiscount')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('priceDiscount must be a number'),
    body('discountPercent')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('discountPercent must be a number'),
    body('videoUrl').optional().isString(),
    body('categoryId')
      .optional({ nullable: true })
      .custom((value) => Number.isFinite(Number(value)))
      .withMessage('categoryId must be a number'),
    body('materialIds').optional().isArray(),
    body('facadeIds').optional().isArray(),
    body('imageUrls').optional().isArray()
  ],
  validateRequest,
  updateKitchen
);

router.delete('/:id', requireAuth, deleteKitchen);

export default router;
