<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		invalid?: boolean;
	} & HTMLInputAttributes;

	let { invalid, ...props }: Props = $props();
</script>

<input
	{...props}
	class={[
		'rounded-2xl border bg-transparent px-4 py-3 text-base/6 text-zinc-950 ring-4 ring-transparent transition placeholder:text-zinc-500 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm/6',
		invalid
			? 'border-red-300 focus:border-red-500 focus:ring-red-500/5'
			: 'border-zinc-300 focus:border-zinc-950 focus:ring-zinc-950/5',
		props.class
	]}
/>
