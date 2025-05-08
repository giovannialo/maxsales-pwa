<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import type { DropdownContext } from './Dropdown';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: ClassValue;
	};

	let props: Props = $props();

	const { toggle } = getContext<DropdownContext>('dropdown');
</script>

<button type="button" class={props.class} onclick={toggle}>
	{@render props.children()}
</button>
