// backend/src/controllers/facadeController.js

import prisma from '../lib/prisma.js';

export const listFacades = async (req, res, next) => {
  try {
    const facades = await prisma.facade.findMany({
      include: { images: true },
      orderBy: { name: 'asc' }
    });
    return res.json(facades);
  } catch (error) {
    return next(error);
  }
};

export const createFacade = async (req, res, next) => {
  try {
    const { name, imageUrls } = req.body;
    const facade = await prisma.facade.create({
      data: {
        name,
        images: imageUrls?.length ? { create: imageUrls.map((url) => ({ url })) } : undefined
      },
      include: { images: true }
    });
    return res.status(201).json(facade);
  } catch (error) {
    return next(error);
  }
};

export const updateFacade = async (req, res, next) => {
  try {
    const facadeId = Number(req.params.id);
    const { name, imageUrls } = req.body;
    const facade = await prisma.facade.update({
      where: { id: facadeId },
      data: { name }
    });
    if (Array.isArray(imageUrls)) {
      await prisma.facadeImage.deleteMany({ where: { facadeId } });
      if (imageUrls.length) {
        await prisma.facadeImage.createMany({
          data: imageUrls.map((url) => ({ facadeId, url }))
        });
      }
    }
    const updated = await prisma.facade.findUnique({
      where: { id: facadeId },
      include: { images: true }
    });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

export const deleteFacade = async (req, res, next) => {
  try {
    const facadeId = Number(req.params.id);
    await prisma.facade.delete({ where: { id: facadeId } });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
