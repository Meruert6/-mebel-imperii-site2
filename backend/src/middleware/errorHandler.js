// backend/src/middleware/errorHandler.js

// Central error handler to keep responses consistent
export const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Unexpected server error';

  if (err.code === 'P1001') {
    status = 503;
    message = 'Database is unavailable. Please start PostgreSQL and retry.';
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(status).json({ error: message });
};
