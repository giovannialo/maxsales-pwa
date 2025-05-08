<script lang="ts">
	import { onMount } from 'svelte';
	import MainNavigation from './MainNavigation.svelte';
	import TopBar from './TopBar.svelte';
	import { loadCart } from '$lib/states/cart.svelte';
	import CartSidebar from './CartSidebar.svelte';

	let { children, data } = $props();

	onMount(async () => {
		await loadCart();
	});
</script>

<MainNavigation />

<div class="flex min-h-full flex-col lg:pl-72">
	<TopBar {...data} />

	<div class="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
		{@render children()}
	</div>
</div>

<CartSidebar />
