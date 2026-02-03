// backend/src/controllers/categoryController.js

import prisma from '../lib/prisma.js';

export const listCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    return res.json(categories);
  } catch (error) {
    return next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({ data: { name } });
    return res.status(201).json(category);
  } catch (error) {
    return next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id: categoryId },
      data: { name }
    });
    return res.json(category);
  } catch (error) {
    return next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    await prisma.category.delete({ where: { id: categoryId } });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
