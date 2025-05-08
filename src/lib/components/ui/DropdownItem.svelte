<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type CommonProps = {
		children: Snippet;
		active?: boolean;
	};

	type AnchorProps = {
		href: string;
	} & CommonProps &
		HTMLAnchorAttributes;

	type ButtonProps = {
		href?: undefined;
	} & CommonProps &
		HTMLButtonAttributes;

	type Props = AnchorProps | ButtonProps;

	let { children, active, ...props }: Props = $props();

	const isLink = 'href' in props && props.href !== undefined && typeof props.href === 'string';
</script>

{#if isLink}
	<a
		{...props}
		class={[
			'mx-0.5 block rounded-xl px-3 py-2 text-sm/6 first:mt-0.5 last:mb-0.5',
			active ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:bg-zinc-950 hover:text-white',
			props.class
		]}>{@render children()}</a
	>
{:else}
	<button
		{...props}
		class={[
			'mx-0.5 block rounded-xl px-3 py-2 text-sm/6 first:mt-0.5 last:mb-0.5',
			active ? 'bg-zinc-950 text-white' : 'text-zinc-700 hover:bg-zinc-950 hover:text-white',
			props.class
		]}>{@render children()}</button
	>
{/if}
