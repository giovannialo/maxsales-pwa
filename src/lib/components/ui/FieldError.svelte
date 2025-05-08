<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		class?: ClassValue;
		message?: string | null;
	};

	let props: Props = $props();
</script>

{#if props.message}
	<div class={['text-base/6 text-red-600 sm:text-sm/6', props.class]}>{props.message}</div>
{/if}
