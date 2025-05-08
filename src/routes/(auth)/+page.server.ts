import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { apiRequest, type APIAuthorizationResponse } from '$lib/helpers/apiRequest';
import { isProductionEnvironment } from '$lib/helpers/functions';

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const clientId = formData.get('clientId') as string;
		const clientSecret = formData.get('clientSecret') as string;
		const errors: Partial<Record<string, string | null | undefined>> = {};

		if (!clientId) {
			errors.clientId = 'Preencha este campo.';
		}

		if (!clientSecret) {
			errors.clientSecret = 'Preencha este campo.';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors });
		}

		try {
			const response = await apiRequest.post('/v1/authorization', {
				body: { clientId, clientSecret }
			});
			const result: APIAuthorizationResponse = await response.json();

			if (!response.ok) {
				errors.global = result.notifications;
				return fail(response.status, { errors });
			}

			cookies.set('token', result.token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: isProductionEnvironment()
			});
		} catch (error) {
			console.error('Error during login:', error);
			errors.global =
				'Ocorreu um erro ao tentar fazer login. Se o problema persistir, entre em contato.';
			return fail(500, { errors });
		}

		return redirect(303, '/home');
	}
} satisfies Actions;
