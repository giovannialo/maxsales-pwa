import { apiRequest, type APIProductResponse } from '$lib/helpers/apiRequest';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const response = await apiRequest.get('/v1/produto', {
			token: locals?.auth?.token,
			params: { tipoRetorno: '0' }
		});
		const result: APIProductResponse = await response.json();

		if (!response.ok) {
			return { products: [] };
		}

		const products = result.data.map((product) => {
			return {
				idProduto: product.idProduto,
				codProd: product.codProd,
				descricao: product.descricao,
				unidade: product.unidade,
				custoReposicao: product.custoReposicao,
				imagemProduto: product.imagemProduto
			};
		});

		return { products };
	} catch (error) {
		console.log('Error while getting products from api:', error);
		return { products: [] };
	}
};
