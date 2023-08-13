import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

declare global {
	// eslint-disable-next-line no-var
	var __prisma: import('@prisma/client').PrismaClient;
}

const prisma = globalThis.__prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
	globalThis.__prisma = prisma;
}

export { prisma };
