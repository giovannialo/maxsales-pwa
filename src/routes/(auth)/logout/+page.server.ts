import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	locals.auth = null;
	cookies.delete('token', { path: '/' });
	return redirect(302, '/');
};
