import type { JWTPayload } from '$lib/interfaces';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (token) {
		try {
			const { nameid, exp, iat } = jwt.decode(token) as JWTPayload;

			if (exp && exp < Date.now() / 1000) {
				event.cookies.delete('token', { path: '/' });
				event.locals.auth = null;
				return await resolve(event);
			}

			event.locals.auth = {
				nameid: Buffer.from(nameid, 'base64').toString('hex'),
				token,
				exp,
				iat
			};
		} catch (error) {
			console.error('Error decoding token:', error);
			event.cookies.delete('token', { path: '/' });
			event.locals.auth = null;
		}
	} else {
		event.locals.auth = null;
	}

	return await resolve(event);
};
