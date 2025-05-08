<script lang="ts">
	import type { Product } from '$lib/states/product.svelte';

	let { product }: { product: Product } = $props();
	let amount = $state(0);
	let price = $derived.by(() => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(product.custoReposicao ?? 0);
	});
</script>

<div class="space-y-4 md:flex md:items-center md:justify-center md:space-y-0 md:gap-x-4">
	<div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-4 md:min-w-0 md:flex-auto">
		<img
			src={product.imagemProduto ?? 'images/placeholders/placeholder-1.jpg'}
			alt={product.descricao}
			class="size-12 rounded-full bg-zinc-50 object-cover"
		/>

		<div class="text-sm sm:min-w-0">
			<p><b>Código:</b> <span class="text-zinc-600">{product.codProd}</span></p>
			<p class="truncate">
				<b>Descrição:</b> <span class="text-zinc-600">{product.descricao}</span>
			</p>
			<p class="xl:hidden">
				<b>Preço:</b> <span class="text-teal-600">{price}</span>
			</p>
		</div>
	</div>

	{#if !product.custoReposicao}
		<div class="text-base whitespace-nowrap text-red-600 sm:text-sm">
			Produto sem preço de custo.
		</div>
	{:else}
		<div class="space-y-2 sm:flex sm:items-center sm:space-y-0 sm:gap-x-4 md:flex-none">
			<p class="hidden text-base font-semibold text-teal-600 sm:text-sm xl:inline">
				{price}
			</p>

			<div class="inline-flex items-center gap-x-0.5 rounded-2xl border border-zinc-200 p-1">
				<select
					class="h-8 w-16 rounded-xl border bg-transparent py-0 pr-6 pl-1 text-sm text-zinc-950 ring-4 ring-transparent transition not-focus:border-transparent focus:border-zinc-950 focus:ring-zinc-950/5 focus:outline-hidden"
				>
					<option value={product.unidade}>
						{product.unidade}
					</option>
				</select>

				<button
					type="button"
					class="inline-flex size-8 items-center justify-center rounded-xl text-sm hover:bg-zinc-950 hover:text-white active:bg-zinc-950 active:text-white"
					onclick={() => {
						if (amount > 0) {
							amount--;
						}
					}}
				>
					<span class="sr-only">Diminuir quantidade</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							fill-rule="evenodd"
							d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				<input
					type="text"
					bind:value={amount}
					class="h-8 w-20 rounded-xl border bg-transparent p-0 text-center text-sm text-zinc-950 ring-4 ring-transparent transition not-focus:border-transparent focus:border-zinc-950 focus:ring-zinc-950/5 focus:outline-hidden sm:w-32 md:w-20 xl:w-32"
				/>

				<button
					type="button"
					class="inline-flex size-8 items-center justify-center rounded-xl text-sm hover:bg-zinc-950 hover:text-white active:bg-zinc-950 active:text-white"
					onclick={() => amount++}
				>
					<span class="sr-only">Aumentar quantidade</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							fill-rule="evenodd"
							d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				<button
					type="button"
					class="-my-1 -mr-1 inline-flex size-10 items-center justify-center rounded-xl text-sm hover:bg-zinc-950 hover:text-white active:bg-zinc-950 active:text-white"
					onclick={async () => {
						if (amount > 0) {
							amount = 0;
						}
					}}
				>
					<span class="sr-only">Adicionar ao carrinho</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/if}
</div>
