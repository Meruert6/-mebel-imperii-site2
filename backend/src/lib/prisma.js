// backend/src/lib/prisma.js

import { PrismaClient } from '@prisma/client';

// Single Prisma client for the whole API
const prisma = new PrismaClient();

export default prisma;
