import { PUBLIC_API_URL } from '$env/static/public';
import type { Product } from '$lib/states/product.svelte';

interface CustomFetchOptions extends Omit<RequestInit, 'body'> {
	body?: Partial<Record<string, any>>;
	params?: Record<string, string>;
	token?: string;
	fetch?: typeof fetch;
}

export const apiRequest = {
	get: async (endpoint: string, options?: CustomFetchOptions): Promise<Response> => {
		const fetchFunction = options?.fetch || fetch;
		const url = new URL(`${PUBLIC_API_URL}${endpoint}`);

		if (options?.params) {
			Object.keys(options.params).forEach((key) => {
				url.searchParams.append(key, options.params![key]);
			});
		}

		return await fetchFunction(`${url}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				...options?.headers,
				...(options?.token ? { Authorization: `Bearer ${options.token}` } : {})
			}
		});
	},

	post: async (endpoint: string, options?: CustomFetchOptions): Promise<Response> => {
		const fetchFunction = options?.fetch || fetch;
		return await fetchFunction(`${PUBLIC_API_URL}${endpoint}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...options?.headers,
				...(options?.token ? { Authorization: `Bearer ${options.token}` } : {})
			},
			body: JSON.stringify(options?.body || {})
		});
	}
};

export interface APIErrorResponse {
	notifications?: string | null;
}

export interface APIResponse<T> extends APIErrorResponse {
	data: T;
}

export interface APIResponseWithPageControl<T> extends APIResponse<T> {
	pageSize: number;
	maxPageSize: number;
	currentPage: number;
	totalPages: number;
	totalItens: number;
}

export interface APIAuthorizationResponse extends APIErrorResponse {
	token: string;
}

export interface APIProductResponse extends APIResponseWithPageControl<Product[]> {}
