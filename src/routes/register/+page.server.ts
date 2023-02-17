import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.validate();

	if (!session) return {};

	throw redirect(303, '/');
}) satisfies PageServerLoad;

export const actions = {
	register: async ({ request }) => {
		const { username, password, name } = Object.fromEntries(await request.formData()) as {
			username: string;
			password: string;
			name: string;
		};

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username,
					// lucia gonna hash the password automatically for you and saved it in the collection of keys in the database
					password
				},
				// this is the user attributes we put into model of user, this data gonna be saved in the collection of users in the database
				attributes: {
					name,
					username
				}
			});
			console.log('user creted', user);

			// EXAMPLE 1 (keys-collection): this is how is created a user in the database
			/*
        {
          "_id": "username:shira",
          "hashed_password": "s2:P3bJwy4uDoFa7VfO:557e4cd7be034ff8aa10327000e3e33a2a244e2192ab826219fd67bb0086e6fcbb7f59da50b49e2c363a0b70a8350ca5166bd9168bd8cb69693cd4550c85dacb",
          "user_id": "eZ9gSoAiQBhf0XO",
          "primary": true
        }
      */

			// EXAMPLE 2 (users-collection): this is how is created a user in the database
			/*
      {
        "_id": "eZ9gSoAiQBhf0XO",
        "name": "Gus foo",
        "role": "user",
        "username": "foo"
      }
      */
		} catch (error) {
			console.error(error);
			return fail(400);
		}
		throw redirect(303, '/login');
	}
} satisfies Actions;
