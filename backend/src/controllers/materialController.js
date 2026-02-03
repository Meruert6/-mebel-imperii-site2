// backend/src/controllers/materialController.js

import prisma from '../lib/prisma.js';

export const listMaterials = async (req, res, next) => {
  try {
    const materials = await prisma.material.findMany({ orderBy: { name: 'asc' } });
    return res.json(materials);
  } catch (error) {
    return next(error);
  }
};

export const createMaterial = async (req, res, next) => {
  try {
    const { name } = req.body;
    const material = await prisma.material.create({ data: { name } });
    return res.status(201).json(material);
  } catch (error) {
    return next(error);
  }
};

export const updateMaterial = async (req, res, next) => {
  try {
    const materialId = Number(req.params.id);
    const { name } = req.body;
    const material = await prisma.material.update({
      where: { id: materialId },
      data: { name }
    });
    return res.json(material);
  } catch (error) {
    return next(error);
  }
};

export const deleteMaterial = async (req, res, next) => {
  try {
    const materialId = Number(req.params.id);
    await prisma.material.delete({ where: { id: materialId } });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
