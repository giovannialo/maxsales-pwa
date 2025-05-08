<script lang="ts">
	import { page } from '$app/state';
	import { closeMainNavigation, isMainNavigationOpen } from '$lib/states/mainNavigation.svelte';
	import { onMount } from 'svelte';

	let navigationElement: HTMLElement;

	function handleClickOutside(event: MouseEvent) {
		if (
			navigationElement &&
			!navigationElement.contains(event.target as Node) &&
			isMainNavigationOpen()
		) {
			closeMainNavigation();
		}
	}

	function handleClickInside(event: MouseEvent | KeyboardEvent) {
		const target = event.target as HTMLElement;
		const tag = target.tagName.toLocaleLowerCase();

		if (['a', 'button'].includes(tag) && isMainNavigationOpen()) {
			closeMainNavigation();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});
</script>

<div
	bind:this={navigationElement}
	class={[
		'fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-300 ease-in-out lg:translate-x-0',
		isMainNavigationOpen() ? 'translate-x-0' : '-translate-x-full'
	]}
	role="button"
	tabindex="-1"
	onclick={handleClickInside}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClickInside(e)}
>
	<div class="flex flex-1 flex-col gap-y-5 border-r border-zinc-200 bg-white px-6 pb-4">
		<div class="flex-none py-4">
			<img alt="MaxSales" src="/logo.svg" class="h-8 w-auto" />
		</div>

		<nav class="flex flex-1 flex-col">
			<ul role="list" class="flex flex-1 flex-col gap-y-7">
				<li>
					<ul role="list" class="-mx-2 space-y-1">
						<li>
							<a
								href="/home"
								class={[
									'group flex gap-x-3 rounded-2xl p-3 text-sm/6 font-semibold',
									page.url.pathname === '/home'
										? 'bg-blue-50 text-blue-600'
										: 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600'
								]}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class={[
										'pointer-events-none size-6 shrink-0',
										page.url.pathname === '/home'
											? 'text-blue-600'
											: 'text-zinc-400 group-hover:text-blue-600'
									]}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
									/>
								</svg>
								Home
							</a>
						</li>

						<li>
							<a
								href="/produtos"
								class={[
									'group flex gap-x-3 rounded-2xl p-3 text-sm/6 font-semibold',
									page.url.pathname === '/produtos'
										? 'bg-blue-50 text-blue-600'
										: 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600'
								]}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class={[
										'pointer-events-none size-6 shrink-0',
										page.url.pathname === '/produtos'
											? 'text-blue-600'
											: 'text-zinc-400 group-hover:text-blue-600'
									]}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
									/>
								</svg>
								Produtos
							</a>
						</li>

						<li>
							<a
								href="/pedidos"
								class={[
									'group flex gap-x-3 rounded-2xl p-3 text-sm/6 font-semibold',
									page.url.pathname === '/pedidos'
										? 'bg-blue-50 text-blue-600'
										: 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600'
								]}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class={[
										'pointer-events-none size-6 shrink-0',
										page.url.pathname === '/pedidos'
											? 'text-blue-600'
											: 'text-zinc-400 group-hover:text-blue-600'
									]}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>

								Pedidos
							</a>
						</li>

						<li>
							<a
								href="/relatorios"
								class={[
									'group flex gap-x-3 rounded-2xl p-3 text-sm/6 font-semibold',
									page.url.pathname === '/relatorios'
										? 'bg-blue-50 text-blue-600'
										: 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600'
								]}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class={[
										'pointer-events-none size-6 shrink-0',
										page.url.pathname === '/relatorios'
											? 'text-blue-600'
											: 'text-zinc-400 group-hover:text-blue-600'
									]}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
									/>
								</svg>

								Relatórios
							</a>
						</li>
					</ul>
				</li>

				<li>
					<h6 class="text-xs/6 font-semibold text-zinc-400">Configurações</h6>

					<ul role="list" class="-mx-2 mt-2 space-y-1">
						<li>
							<a
								href="/configuracoes/parametros"
								class={[
									'group flex gap-x-3 rounded-2xl p-3 text-sm/6 font-semibold',
									page.url.pathname === '/configuracoes/parametros'
										? 'bg-blue-50 text-blue-600'
										: 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600'
								]}
							>
								<span
									class={[
										'pointer-events-none flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
										page.url.pathname === '/configuracoes/parametros'
											? 'border-blue-600 text-blue-600'
											: 'border-zinc-200 text-zinc-400 group-hover:border-blue-600  group-hover:text-blue-600'
									]}>P</span
								>
								<span class="pointer-events-none truncate">Parâmetros</span>
							</a>
						</li>

						<li>
							<a
								href="/configuracoes/tabela-de-precos"
								class={[
									'group flex gap-x-3 rounded-2xl p-3 text-sm/6 font-semibold',
									page.url.pathname === '/configuracoes/tabela-de-precos'
										? 'bg-blue-50 text-blue-600'
										: 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600'
								]}
							>
								<span
									class={[
										'pointer-events-none flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
										page.url.pathname === '/configuracoes/tabela-de-precos'
											? 'border-blue-600 text-blue-600'
											: 'border-zinc-200 text-zinc-400 group-hover:border-blue-600  group-hover:text-blue-600'
									]}>T</span
								>
								<span class="pointer-events-none truncate">Tabela de preços</span>
							</a>
						</li>
					</ul>
				</li>

				<li class="mt-auto">
					<a
						href="/reportar-bugs"
						class={[
							'group -mx-2 flex gap-x-3 rounded-2xl p-3 text-sm/6 font-semibold',
							page.url.pathname === '/reportar-bugs'
								? 'bg-blue-50 text-blue-600'
								: 'text-zinc-700 hover:bg-zinc-50 hover:text-blue-600'
						]}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class={[
								'pointer-events-none size-6 shrink-0',
								page.url.pathname === '/reportar-bugs'
									? 'text-blue-600'
									: 'text-zinc-400 group-hover:text-blue-600'
							]}
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082"
							/>
						</svg>

						Reportar bugs
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>
