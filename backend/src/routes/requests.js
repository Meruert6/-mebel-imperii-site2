// backend/src/routes/requests.js

import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import {
  listRequests,
  createRequest,
  updateRequestStatus,
  exportRequests
} from '../controllers/requestController.js';

const router = express.Router();

router.get('/', requireAuth, listRequests);
router.get('/export', requireAuth, exportRequests);

router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('phone').isString().notEmpty().withMessage('Phone is required'),
    body('comment').optional().isString(),
    body('kitchenId').optional().isNumeric()
  ],
  validateRequest,
  createRequest
);

router.patch(
  '/:id/status',
  requireAuth,
  [body('status').isIn(['NEW', 'IN_PROGRESS', 'DONE'])],
  validateRequest,
  updateRequestStatus
);

export default router;
