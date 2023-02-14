import type { Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// let's get the session from the locals
	const session = await locals.validate();

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
			const key = await auth.validateKeyPassword('username', username, password);

			// console.log(key) return something like this:
			/*
      {
        providerId: 'username',
        providerUserId: 'sara',
        isPrimary: true,
        isPasswordDefined: true,
        userId: 'Ml3RuTY1Rfp2Nh7'
      }
    */

			// to create a session we need the pass the userId which is the id of the user in the database
			const session = await auth.createSession(key.userId);
			// EXAMPLE(sessions-collection): this is how is created a user in the database
			/*
     {
        "_id": "Mi8wZCwuW9BlMYk1Bn7hDfstZK7YSMYOlUx9nAel",
        "user_id": "eZ9gSoAiQBhf0XO",
        "active_expires": {
          "$numberLong": "1676493381029"
        },
        "idle_expires": {
          "$numberLong": "1677702981029"
        },
      }
      */

			// now let's set the session so we can get the session everywhere in server like this page
			locals.setSession(session);
		} catch (error) {
			console.error(error);
			return fail(400);
		}

		throw redirect(303, '/');
	}
} satisfies Actions;
