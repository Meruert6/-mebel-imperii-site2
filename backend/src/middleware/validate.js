// backend/src/middleware/validate.js

import { validationResult } from 'express-validator';

// Collect validation errors in one place
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }
  return next();
};
