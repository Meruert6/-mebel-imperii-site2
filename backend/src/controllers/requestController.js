// backend/src/controllers/requestController.js

import xlsx from 'xlsx';
import prisma from '../lib/prisma.js';

export const listRequests = async (req, res, next) => {
  try {
    const requests = await prisma.request.findMany({
      include: { kitchen: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(requests);
  } catch (error) {
    return next(error);
  }
};

export const createRequest = async (req, res, next) => {
  try {
    const { name, phone, comment, kitchenId } = req.body;
    const request = await prisma.request.create({
      data: {
        name,
        phone,
        comment,
        kitchenId: kitchenId ? Number(kitchenId) : null
      }
    });
    return res.status(201).json(request);
  } catch (error) {
    return next(error);
  }
};

export const updateRequestStatus = async (req, res, next) => {
  try {
    const requestId = Number(req.params.id);
    const { status } = req.body;
    const updated = await prisma.request.update({
      where: { id: requestId },
      data: { status }
    });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

export const exportRequests = async (req, res, next) => {
  try {
    const requests = await prisma.request.findMany({
      include: { kitchen: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });

    const rows = requests.map((item) => ({
      ID: item.id,
      Имя: item.name,
      Телефон: item.phone,
      Комментарий: item.comment || '',
      Кухня: item.kitchen?.name || '',
      Статус: item.status,
      Создано: item.createdAt.toISOString()
    }));

    const sheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, sheet, 'Requests');

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename="requests.xlsx"');
    return res.send(buffer);
  } catch (error) {
    return next(error);
  }
};
