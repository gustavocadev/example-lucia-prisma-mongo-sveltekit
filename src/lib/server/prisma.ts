import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const prisma = globalThis.__prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
	globalThis.__prisma = prisma;
}

export { prisma };
