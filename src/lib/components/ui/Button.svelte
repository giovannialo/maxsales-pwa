<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
	} & HTMLButtonAttributes;

	let { children, ...props }: Props = $props();
</script>

<button
	{...props}
	class={[
		'cursor-default rounded-2xl bg-zinc-950 px-4 py-3 text-base/6 font-semibold text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-950 disabled:opacity-50 sm:text-sm/6',
		props.class
	]}>{@render children()}</button
>
