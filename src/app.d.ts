/* eslint-disable no-var */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			validate: import('@lucia-auth/sveltekit').Validate;
			validateUser: import('@lucia-auth/sveltekit').ValidateUser;
			setSession: import('@lucia-auth/sveltekit').SetSession;
		}
		// interface PageData {}
		// interface Platform {}
	}

	var __prisma: import('@prisma/client').PrismaClient;

	declare namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		// we omit the id property because lucia automatically generate it for us when we create a user
		type UserAttributes = Omit<import('@prisma/client').User, 'id'>;
	}
}

export {};
