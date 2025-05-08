<script lang="ts">
	import ConnectionMonitoring from '$lib/components/ui/ConnectionMonitoring.svelte';
	import UpdateMonitoring from '$lib/components/ui/UpdateMonitoring.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-full flex-col justify-center pt-8 pb-16">
	<div class="mx-auto w-full max-w-sm flex-none px-4">
		<div class="mb-8 inline-flex items-center gap-x-3">
			<img alt="MaxSales" src="/logo.svg" class="h-8 w-auto" />
			<span class="text-2xl font-bold">MaxSales</span>
		</div>

		{@render children()}
	</div>
</div>

<div
	class="fixed inset-x-0 bottom-0 flex items-center gap-x-4 bg-white/75 px-4 py-2 backdrop-blur-sm"
>
	<ConnectionMonitoring />
	<UpdateMonitoring />
</div>
