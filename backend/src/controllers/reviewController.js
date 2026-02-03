// backend/src/controllers/reviewController.js

import prisma from '../lib/prisma.js';

export const listReviews = async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      include: { images: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(reviews);
  } catch (error) {
    return next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { name, rating, comment, imageUrls } = req.body;
    const images = Array.isArray(imageUrls) ? imageUrls.slice(0, 10) : [];
    const review = await prisma.review.create({
      data: {
        name,
        rating: Number(rating),
        comment,
        images: images.length ? { create: images.map((url) => ({ url })) } : undefined
      },
      include: { images: true }
    });
    return res.status(201).json(review);
  } catch (error) {
    return next(error);
  }
};
