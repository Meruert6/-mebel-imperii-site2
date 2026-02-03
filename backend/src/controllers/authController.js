// backend/src/controllers/authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const issueToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const registerAdmin = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingAdmin = await prisma.user.findFirst();
    if (existingAdmin && process.env.ALLOW_ADMIN_REGISTER !== 'true') {
      return res.status(403).json({ error: 'Admin registration is disabled' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, name, role: 'admin' }
    });

    const token = issueToken(user);
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    return next(error);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = issueToken(user);
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    return next(error);
  }
};

