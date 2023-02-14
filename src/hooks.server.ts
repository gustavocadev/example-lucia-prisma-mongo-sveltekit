import { auth } from './lib/server/lucia';
import { handleHooks } from '@lucia-auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const customHandle = (async ({ resolve, event }) => {
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleHooks(auth), customHandle);
