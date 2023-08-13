// npm add lucia-auth
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';

// npm add @lucia-auth/adapter-prisma
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';
import { dev } from '$app/environment';

export const auth = lucia({
	adapter: prismaAdapter(prisma, {
		user: 'user',
		key: 'key',
		session: 'session'
	}),
	middleware: sveltekit(),
	env: dev ? 'DEV' : 'PROD',
	getUserAttributes: ({ id, name, username }) => ({
		userId: id,
		name,
		username
	})
});
