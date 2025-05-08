let isOpen = $state(false);

export function isMainNavigationOpen() {
	return isOpen;
}

export function toggleMainNavigation() {
	isOpen = !isOpen;
}

export function openMainNavigation() {
	isOpen = true;
}

export function closeMainNavigation() {
	isOpen = false;
}
