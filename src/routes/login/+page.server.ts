import type { Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals }) => {
	// let's get the session from the locals
	const session = await locals.auth.validate();

	if (!session) {
		return {};
	}

	throw redirect(303, '/');
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, locals }) => {
		const { username, password } = Object.fromEntries(await request.formData()) as {
			username: string;
			password: string;
		};

		console.log({
			username,
			password
		});

		try {
			const key = await auth.useKey('username', username, password);
			// console.log(key) return something like this:
			/*
      {
        type: 'persistent',
        isPrimary: true,
        providerId: 'username',
        providerUserId: 'sara',
        userId: 'nV68SDRrRwZ9zlv',
        isPasswordDefined: true
      }
    */

			// to create a session we need the pass the userId which is the id of the user in the database
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			console.log(session);
			// console.log(session) return something like this:
			/*
     {
        userId: 'nV68SDRrRwZ9zlv',
        activePeriodExpires: 2023-03-23T23:21:03.972Z,
        sessionId: 'tbNXULwQHpUwMonlSYGJKAShSad8bdONNPf5k5eT',
        idlePeriodExpires: 2023-04-06T23:21:03.972Z,
        state: 'active',
        isFresh: true
      }
      */

			// EXAMPLE(sessions-collection): this is how is created a user in the database
			/*
        {
          _id: "ltwLb2JBWNBd0utmMsEElmnxVzsbiiGxD0uVvmiA",
          user_id: "nV68SDRrRwZ9zlv",
          active_expires: 1679604913588,
          idle_expires:1680814513588
        }
      */
			// now let's set the session so we can get the session everywhere in server like this page
			locals.auth.setSession(session);
		} catch (error) {
			console.error(error);
			return fail(400);
		}

		throw redirect(303, '/');
	}
} satisfies Actions;
