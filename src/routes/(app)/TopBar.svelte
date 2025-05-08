<script lang="ts">
	import ConnectionMonitoring from '$lib/components/ui/ConnectionMonitoring.svelte';
	import Dropdown from '$lib/components/ui/Dropdown.svelte';
	import DropdownItem from '$lib/components/ui/DropdownItem.svelte';
	import DropdownMenu from '$lib/components/ui/DropdownMenu.svelte';
	import DropdownToggle from '$lib/components/ui/DropdownToggle.svelte';
	import UpdateMonitoring from '$lib/components/ui/UpdateMonitoring.svelte';
	import type { AuthenticatedUser } from '$lib/interfaces';
	import { getCart, toggleCartSidebar } from '$lib/states/cart.svelte';
	import { toggleMainNavigation } from '$lib/states/mainNavigation.svelte';

	let { auth }: { auth?: AuthenticatedUser | null } = $props();
</script>

<div class="sticky top-0 z-40 w-full max-w-7xl lg:mx-auto lg:px-8">
	<div
		class="flex h-16 items-center gap-x-4 border-b border-zinc-200 bg-white/75 px-4 shadow-xs backdrop-blur-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
	>
		<button
			type="button"
			class="-m-2.5 p-2.5 text-zinc-700 lg:hidden"
			onclick={toggleMainNavigation}
		>
			<span class="sr-only">Abrir menu</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>

		<div class="h-6 w-[1px] bg-zinc-200 lg:hidden"></div>

		<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
			<form class="grid flex-1 grid-cols-1">
				<input
					type="search"
					name="search"
					class="col-start-1 row-start-1 block size-full border-transparent bg-transparent pl-8 text-base placeholder-zinc-400 outline-none focus:ring-0 sm:text-sm/6"
					placeholder="Pesquisar..."
				/>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-zinc-400"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
					/>
				</svg>
			</form>

			<div class="flex items-center gap-x-4 lg:gap-x-6">
				<UpdateMonitoring class="-mx-2.5 p-2.5" showText={false} />
				<ConnectionMonitoring class="-mx-2.5 p-2.5" showText={false} />

				<button
					type="button"
					class="group -m-2.5 flex items-center p-2.5 text-zinc-400 hover:text-zinc-500"
					onclick={toggleCartSidebar}
				>
					<span class="sr-only">Visualizar itens no carrinho</span>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>

					<span class="ml-2 text-sm font-medium text-zinc-700 group-hover:text-zinc-800"
						>{getCart().length}</span
					>
				</button>

				<div class="hidden lg:block lg:h-6 lg:w-[1px] lg:bg-zinc-200"></div>

				<Dropdown placement="bottom-right">
					<DropdownToggle class="-m-1.5 flex items-center p-1.5">
						<span class="sr-only">Abrir menu usuário</span>

						<img
							alt="Avatar do usuário {auth?.nameid}"
							src={auth?.nameid
								? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80'
								: 'images/placeholders/placeholder-1.jpg'}
							class="size-8 rounded-full bg-zinc-50 object-cover"
						/>

						<span class="hidden lg:flex lg:items-center">
							<span class="ml-4 text-sm/6 font-semibold">{auth?.nameid ?? 'Nâo autenticado'}</span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="ml-2 size-5 text-zinc-400"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m19.5 8.25-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</span>
					</DropdownToggle>

					<DropdownMenu class="w-40">
						<DropdownItem href="/perfil" class="flex items-center gap-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-6"
							>
								<path
									fill-rule="evenodd"
									d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
									clip-rule="evenodd"
								/>
							</svg>
							Seu perfil
						</DropdownItem>

						<DropdownItem
							href="/logout"
							class="flex items-center gap-x-2"
							data-sveltekit-preload-data="off"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-6"
							>
								<path
									fill-rule="evenodd"
									d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
									clip-rule="evenodd"
								/>
							</svg>
							Logout
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	</div>
</div>
