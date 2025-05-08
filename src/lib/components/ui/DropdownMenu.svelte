<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getPlacementClasses, type DropdownContext } from './Dropdown';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: ClassValue;
	};

	let props: Props = $props();
	let { isOpen, placement } = $derived(getContext<DropdownContext>('dropdown'));
</script>

{#if isOpen}
	<div
		in:fly={{ y: 4, duration: 100 }}
		out:fly={{ y: 4, duration: 100 }}
		class={[
			'absolute z-10 rounded-xl bg-white shadow-sm',
			getPlacementClasses(placement),
			props.class
		]}
	>
		{@render props.children()}
	</div>
{/if}
