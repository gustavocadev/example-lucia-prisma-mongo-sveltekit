// hooks.server.ts
import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return resolve(event);
};
