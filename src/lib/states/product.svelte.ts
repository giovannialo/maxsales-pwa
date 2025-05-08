import { addItem, getAllItemsByInsertionOrder } from '$lib/db/indexedDb';

export interface Product {
	idProduto: number;
	codProd: string;
	descricao: string;
	unidade: string;
	custoReposicao: number | null;
	imagemProduto: string | null;
}

let products: Product[] = $state([]);

export function getProducts(): Product[] {
	return products;
}

export async function loadProducts(productData: Product[]): Promise<void> {
	if (productData.length === 0) {
		return;
	}

	for (const product of productData) {
		await addItem('products', product);
	}

	products = await getAllItemsByInsertionOrder('products');
}
