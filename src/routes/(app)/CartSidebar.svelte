<script lang="ts">
	import { deleteItem } from '$lib/db/indexedDb';
	import {
		closeCartSidebar,
		getCartItems,
		getTotal,
		isCartSidebarOpen,
		removeCartItem
	} from '$lib/states/cart.svelte';
	import { onMount } from 'svelte';

	let cartElement: HTMLElement;

	function handleClickOutside(event: MouseEvent) {
		if (cartElement && !cartElement.contains(event.target as Node) && isCartSidebarOpen()) {
			closeCartSidebar();
		}
	}

	function handleClickInside(event: MouseEvent | KeyboardEvent) {
		const target = event.target as HTMLElement;
		const tag = target.tagName.toLocaleLowerCase();

		if (target.closest('.preserve-click')) {
			return;
		}

		if (['a', 'button'].includes(tag) && isCartSidebarOpen()) {
			closeCartSidebar();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});
</script>

<div
	bind:this={cartElement}
	class={[
		'fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col transition-transform duration-300 ease-in-out',
		isCartSidebarOpen() ? 'translate-x-0' : 'translate-x-full'
	]}
	role="button"
	tabindex="-1"
	onclick={handleClickInside}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClickInside(e)}
>
	<div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
		<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
			<div class="flex items-start justify-between">
				<h2 class="text-lg font-medium">Carrinho de compras</h2>
				<div class="ml-3 flex h-7 items-center">
					<button
						type="button"
						class="relative -m-2 p-2 text-zinc-400 hover:text-zinc-500"
						onclick={closeCartSidebar}
					>
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Fechar sidebar</span>
						<svg
							class="size-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>

			<div class="mt-8">
				<div class="flow-root">
					<ul role="list" class="-my-6 divide-y divide-zinc-200">
						{#if getCartItems().length === 0}
							<li class="flex py-6">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-12 text-zinc-400"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
									/>
								</svg>

								<div class="ml-4 flex flex-1 flex-col">
									<div>
										<div class="flex justify-between">
											<h3 class="text-sm font-medium">Carrinho vazio</h3>
										</div>
										<p class="mt-1 text-sm text-zinc-500">Adicione produtos ao carrinho.</p>
									</div>
								</div>
							</li>
						{:else}
							{#each getCartItems() as item (item.idProduto)}
								<li class="flex py-6">
									<div class="size-16 shrink-0 overflow-hidden rounded-full border border-zinc-200">
										<img
											src={item.imagemProduto ?? 'images/placeholders/placeholder-1.jpg'}
											alt={item.descricao}
											class="size-full object-cover"
										/>
									</div>

									<div class="ml-4 flex flex-1 flex-col">
										<div>
											<div class="flex justify-between">
												<h3 class="text-sm font-medium">
													<a href="#">{item.codProd}</a>
												</h3>
												<p class="ml-4 text-sm">
													{new Intl.NumberFormat('pt-BR', {
														style: 'currency',
														currency: 'BRL'
													}).format(item.custoReposicao)}
												</p>
											</div>
											<p class="mt-1 text-sm text-zinc-500">{item.descricao}</p>
										</div>
										<div class="mt-1 flex flex-1 items-end justify-between text-sm">
											<p class="text-zinc-500">Qtd {item.amount}</p>

											<div class="flex">
												<button
													type="button"
													class="preserve-click font-medium text-blue-600 hover:text-blue-500"
													onclick={async () => {
														await deleteItem('cart', item.idProduto);
														removeCartItem(item.idProduto);
													}}>Remover</button
												>
											</div>
										</div>
									</div>
								</li>
							{/each}
						{/if}
					</ul>
				</div>
			</div>
		</div>

		<div class="border-t border-zinc-200 px-4 py-6 sm:px-6">
			<div class="flex justify-between text-base font-medium">
				<p>Subtotal</p>
				<p>
					{new Intl.NumberFormat('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					}).format(getTotal())}
				</p>
			</div>
			<p class="mt-0.5 text-sm text-zinc-500">
				Frete e impostos calculados na finalização da compra.
			</p>
			<div class="mt-6">
				<a
					href="#"
					class="flex items-center justify-center rounded-2xl border border-transparent bg-zinc-950 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-zinc-800"
					>Checkout</a
				>
			</div>
			<div class="mt-6 flex justify-center text-center text-sm text-zinc-500">
				<p>
					ou
					<button type="button" class="font-medium text-blue-600 hover:text-blue-500">
						Continue comprando
						<span aria-hidden="true"> &rarr;</span>
					</button>
				</p>
			</div>
		</div>
	</div>
</div>
