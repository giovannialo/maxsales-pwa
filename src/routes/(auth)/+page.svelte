<script lang="ts">
	import Seo from '$lib/components/functional/Seo.svelte';
	import {
		connectionCheckTrigger,
		getDeviceConnectionStatus
	} from '$lib/states/connectionMonitoring.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import type { PageProps } from './$types';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { snackbar } from '$lib/states/snackbar.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import FieldError from '$lib/components/ui/FieldError.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let { form }: PageProps = $props();
	let isSubmitting = $state(false);

	async function handleSubmit(
		event: SubmitEvent & { currentTarget: HTMLFormElement }
	): Promise<void> {
		event.preventDefault();
		isSubmitting = true;

		const formData = new FormData(event.currentTarget);

		try {
			const response = await fetch(event.currentTarget.action, {
				method: event.currentTarget.method,
				body: formData,
				headers: {
					Accept: 'application/json'
				}
			});
			const result: ActionResult = deserialize(await response.text());

			if (result.type === 'success') {
				await invalidateAll();
			} else if (result.type === 'failure' && result.data?.errors?.global) {
				snackbar.show(result.data.errors.global);
			}

			applyAction(result);
		} catch (error) {
			connectionCheckTrigger();
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Seo title="Login" />

<div class="space-y-8">
	{#if getDeviceConnectionStatus() === 'offline'}
		<h1 class="text-2xl/8 font-semibold sm:text-xl/8">Dispositivo ou servidor offline</h1>

		<p class="text-base/6 text-zinc-600 sm:text-sm/6">
			Você poderá continuar utilizando a aplicação no modo offline, com os dados armazenados em
			cache. No entanto, assim que a conexão for restabelecida, será necessário fazer login
			novamente para que a sincronização com o servidor seja realizada.
		</p>

		<a href="/home" class="text-base/6 text-zinc-600 hover:text-zinc-950 sm:text-sm/6">
			<span class="font-semibold">Clique aqui</span> para continuar &rarr;
		</a>
	{:else if getDeviceConnectionStatus() === 'online'}
		<h1 class="text-2xl/8 font-semibold sm:text-xl/8">Entre com sua conta</h1>

		<form method="POST" action="?/login" onsubmit={handleSubmit} class="space-y-6">
			<div>
				<Label for="clientId">Usuário</Label>
				<Input
					type="text"
					name="clientId"
					required
					placeholder="Digite seu usuário"
					autocomplete="username"
					disabled={isSubmitting}
					invalid={!!form?.errors?.clientId}
					id="clientId"
					class="mt-2 block w-full"
				/>
				<FieldError message={form?.errors?.clientId} />
			</div>

			<div>
				<Label for="clientSecret">Senha</Label>
				<Input
					type="password"
					name="clientSecret"
					required
					placeholder="Digite sua senha"
					autocomplete="current-password"
					disabled={isSubmitting}
					invalid={!!form?.errors?.clientSecret}
					id="clientSecret"
					class="mt-2 block w-full"
				/>
				<FieldError message={form?.errors?.clientSecret} />
			</div>

			<div>
				<Button type="submit" disabled={isSubmitting} class="w-full shadow-lg shadow-zinc-950/30">
					{isSubmitting ? 'Entrando...' : 'Entrar'}
				</Button>
			</div>
		</form>
	{/if}
</div>
