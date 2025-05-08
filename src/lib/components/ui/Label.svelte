<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLLabelAttributes;

	let { children, ...props }: Props = $props();
</script>

<label {...props} class={['text-base/6 font-medium sm:text-sm/6', props.class]}
	>{@render children()}</label
>
