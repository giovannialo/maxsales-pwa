import { getAllItemsByInsertionOrder } from '$lib/db/indexedDb';
import { getProducts } from './product.svelte';

export interface Cart {
	idProduto: number;
	unidade: string;
	amount: number;
}

export interface CartItemWithDetails extends Cart {
	codProd: string;
	descricao: string;
	custoReposicao: number;
	imagemProduto: string | null;
}

let cart: Cart[] = $state([]);

export function getCart(): Cart[] {
	return cart;
}

export async function loadCart(): Promise<void> {
	cart = await getAllItemsByInsertionOrder('cart');
}

export function insertCartItem(item: Cart): Cart {
	const existingItem = cart.find((cartItem) => cartItem.idProduto === item.idProduto);

	if (existingItem) {
		existingItem.amount += item.amount;
		return existingItem;
	} else {
		cart.push(item);
		return item;
	}
}

export function removeCartItem(idProduto: number): void {
	const index = cart.findIndex((cartItem) => cartItem.idProduto === idProduto);

	if (index !== -1) {
		cart.splice(index, 1);
	}
}

export function getCartItems(): CartItemWithDetails[] {
	return cart.map((item) => {
		const product = getProducts().find((product) => product.idProduto === item.idProduto);

		return {
			idProduto: item.idProduto,
			amount: item.amount,
			codProd: product?.codProd,
			descricao: product?.descricao,
			custoReposicao: product?.custoReposicao,
			unidade: product?.unidade,
			imagemProduto: product?.imagemProduto
		} as CartItemWithDetails;
	});
}

export function getTotal(): number {
	const products = getProducts();
	return cart.reduce((total, item) => {
		const product = products.find((product) => product.idProduto === item.idProduto);
		if (!product) {
			return total;
		}

		return total + (product.custoReposicao ?? 0) * item.amount;
	}, 0);
}

let sidebarOpen = $state(false);

export function isCartSidebarOpen(): boolean {
	return sidebarOpen;
}

export function toggleCartSidebar(): void {
	sidebarOpen = !sidebarOpen;
}

export function closeCartSidebar(): void {
	sidebarOpen = false;
}

export function openCartSidebar(): void {
	sidebarOpen = true;
}
