import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
  const session = await locals.auth.validate();
  
  if (!session) return { user: null };

  const user = await prisma.user.findUnique({
		where: {
			id: session.user.userId
		}
  });
  
  return {
    user
  };
}) satisfies LayoutServerLoad;