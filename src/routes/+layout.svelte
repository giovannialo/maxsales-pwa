<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { detectSWUpdate } from '$lib/states/updateMonitoring.svelte';
	import { initializeConnectionMonitoring } from '$lib/states/connectionMonitoring.svelte';
	import Snackbar from '$lib/components/ui/Snackbar.svelte';

	let { children } = $props();

	onMount(() => {
		detectSWUpdate();
		initializeConnectionMonitoring();

		return () => {
			initializeConnectionMonitoring();
		};
	});
</script>

{@render children()}

<Snackbar />
