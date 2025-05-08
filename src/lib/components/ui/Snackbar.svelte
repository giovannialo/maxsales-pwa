<script lang="ts">
	import { fly } from 'svelte/transition';
	import {
		getCloseButtonColor,
		getColor,
		getSnackbars,
		snackbar
	} from '$lib/states/snackbar.svelte';
</script>

{#if getSnackbars().length}
	<div class="fixed right-0 bottom-0 z-50">
		{#each getSnackbars() as snack (snack.id)}
			<div
				in:fly={{ x: 20 }}
				out:fly={{ x: 20 }}
				class={[
					'relative mx-4 my-2 flex max-w-md items-center justify-between rounded-2xl px-4 py-3 text-sm/6 shadow-xs sm:text-xs/6',
					getColor(snack.type)
				]}
			>
				<p>{snack.message}</p>

				<button
					type="button"
					class={['ml-6 cursor-pointer font-semibold', getCloseButtonColor(snack.type)]}
					onclick={() => snackbar.dismiss(snack.id)}>OK</button
				>

				{#if snack.timeout}
					<div
						class="animate-shrink absolute bottom-0 left-0 h-0.5 bg-white/50"
						style="animation-duration: {snack.timeout}ms"
					></div>
				{/if}
			</div>
		{/each}
	</div>
{/if}
