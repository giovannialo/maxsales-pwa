<script lang="ts">
	import { getDeviceConnectionStatus } from '$lib/states/connectionMonitoring.svelte';
	import { isUpdateAvailable, isUpdatingApp, updateSW } from '$lib/states/updateMonitoring.svelte';
	import type { ClassValue } from 'svelte/elements';

	type Props = {
		showIcon?: boolean;
		showText?: boolean;
		class?: ClassValue;
	};

	let { showIcon = true, showText = true, ...props }: Props = $props();
</script>

{#if isUpdateAvailable() && getDeviceConnectionStatus() === 'online'}
	<button
		type="button"
		class={['inline-flex cursor-pointer items-center gap-x-2', props.class]}
		onclick={updateSW}
	>
		{#if isUpdatingApp()}
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
			<span class={['text-sm/6 text-zinc-600', !showText ? 'sr-only' : '']}>Atualizando...</span>
		{:else}
			{#if showIcon}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6 text-blue-600"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="absolute size-6 animate-ping text-blue-600"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
					/>
				</svg>
			{/if}
			<span class={['text-sm/6 text-zinc-600', !showText ? 'sr-only' : '']}
				>Atualização disponível</span
			>
		{/if}
	</button>
{/if}
