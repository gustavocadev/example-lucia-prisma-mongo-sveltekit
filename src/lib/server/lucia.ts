// npm add lucia-auth
import lucia from 'lucia-auth';

// npm add @lucia-auth/adapter-prisma
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';
import { dev } from '$app/environment';

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: ({ id, name, username }) => ({
		userId: id,
		name,
		username
	})
});
