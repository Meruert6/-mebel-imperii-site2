// backend/src/routes/reviews.js

import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate.js';
import { listReviews, createReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', listReviews);

router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('rating')
      .custom((value) => Number.isFinite(Number(value)) && Number(value) >= 1 && Number(value) <= 5)
      .withMessage('Rating must be 1-5'),
    body('comment').optional().isString(),
    body('imageUrls')
      .optional()
      .isArray()
      .custom((value) => value.length <= 10)
      .withMessage('Max 10 images')
  ],
  validateRequest,
  createReview
);

export default router;
