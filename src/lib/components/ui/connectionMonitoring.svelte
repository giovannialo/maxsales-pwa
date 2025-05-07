<script lang="ts">
	import { getDeviceConnectionStatus } from '$lib/states/connectionMonitoring.svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		showIcon?: boolean;
		showText?: boolean;
		class?: ClassValue;
	};

	let { showIcon = true, showText = true, ...props }: Props = $props();
</script>

<div class={['inline-flex items-center gap-x-2', props.class]}>
	{#if getDeviceConnectionStatus() === 'online'}
		{#if showIcon}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6 text-teal-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
				/>
			</svg>
		{/if}
		<span class={['text-sm/6 text-zinc-600', !showText ? 'sr-only' : '']}>Online</span>
	{:else if getDeviceConnectionStatus() === 'offline'}
		{#if showIcon}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6 text-red-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
				/>
			</svg>
		{/if}
		<span class={['text-sm/6 text-zinc-600', !showText ? 'sr-only' : '']}>Offline</span>
	{:else if getDeviceConnectionStatus() === 'checking'}
		{#if showIcon}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6 animate-spin text-blue-600"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
				/>
			</svg>
		{/if}
		<span class={['text-sm/6 text-zinc-600', !showText ? 'sr-only' : '']}
			>Verificando conexão...</span
		>
	{/if}
</div>
