<script lang="ts">
	import { onMount } from 'svelte';
	import { getProducts, loadProducts, type Product } from '$lib/states/product.svelte';
	import Seo from '$lib/components/functional/Seo.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { getDeviceConnectionStatus } from '$lib/states/connectionMonitoring.svelte.js';
	import ProductItem from './ProductItem.svelte';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let isSyncing = $state(false);

	onMount(async () => {
		await loadProducts(data.products);
	});
</script>

<Seo title="Produtos" />

<div class="flex-none space-y-4">
	<div class="flex flex-none items-end justify-between">
		<h2 class="text-xl font-bold sm:text-lg">Produtos ({getProducts().length})</h2>

		<form
			method="POST"
			action="?/sync"
			use:enhance={() => {
				isSyncing = true;

				return async ({ update, result }) => {
					await update();
					isSyncing = false;

					if (result.type === 'success' && result?.data?.products) {
						await loadProducts(result.data.products as Product[]);
					}
				};
			}}
		>
			<Button
				type="submit"
				disabled={isSyncing || getDeviceConnectionStatus() !== 'online'}
				class="inline-flex items-center gap-x-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class={['size-6', isSyncing ? 'animate-spin' : '']}
				>
					<path
						fill-rule="evenodd"
						d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
						clip-rule="evenodd"
					/>
				</svg>
				{isSyncing ? 'Sincronizando...' : 'Sincronizar'}
			</Button>
		</form>
	</div>

	<div class="space-y-8 rounded-2xl border border-zinc-200">
		{#if getProducts().length === 0}
			<p class="p-4 text-center text-base/6 text-zinc-600 sm:text-sm/6">
				Nenhum produto encontrado.
			</p>
		{:else}
			<ul role="list" class="divide-y divide-zinc-200">
				{#each getProducts() as product (product.idProduto)}
					<li class="p-4 sm:p-6 lg:p-8">
						<ProductItem {product} />
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
