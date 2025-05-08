<script lang="ts">
	import MainNavigation from './MainNavigation.svelte';
	import TopBar from './TopBar.svelte';

	let { children, data } = $props();
</script>

<MainNavigation />

<div class="flex min-h-full flex-col lg:pl-72">
	<TopBar {...data} />

	<div class="max-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 lg:px-8">
		{@render children()}
	</div>
</div>
