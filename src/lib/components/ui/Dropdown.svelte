<script lang="ts">
	import { onMount, setContext, type Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import type { DropdownContext, Placement } from './Dropdown';

	type Props = {
		children: Snippet;
		class?: ClassValue;
		placement?: Placement;
	};

	let props: Props = $props();
	let dropdownElement: HTMLDivElement;
	let isOpen = $state(false);

	const context: DropdownContext = {
		get isOpen() {
			return isOpen;
		},
		toggle,
		placement: props.placement || 'bottom-left'
	};

	function toggle() {
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node) && isOpen) {
			isOpen = false;
		}
	}

	function handleClickInside(event: MouseEvent | KeyboardEvent) {
		const target = event.target as HTMLElement;
		const tag = target.tagName.toLowerCase();

		if (tag === 'a' && isOpen) {
			isOpen = false;
		}
	}

	setContext('dropdown', context);

	onMount(() => {
		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});
</script>

<div
	bind:this={dropdownElement}
	class={['relative', props.class]}
	role="button"
	tabindex="-1"
	onclick={handleClickInside}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClickInside(e)}
>
	{@render props.children()}
</div>
