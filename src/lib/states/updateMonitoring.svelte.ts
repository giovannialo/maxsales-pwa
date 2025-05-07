let serviceWorker: ServiceWorker | null = $state(null);
let updateAvailable = $state(false);
let updatingApp = $state(false);

export function isUpdateAvailable() {
	return updateAvailable;
}

export function isUpdatingApp() {
	return updatingApp;
}

export async function detectSWUpdate() {
	const registration = await navigator.serviceWorker.ready;

	if (registration.waiting) {
		serviceWorker = registration.waiting;
		updateAvailable = true;
	}

	registration.addEventListener('updatefound', () => {
		serviceWorker = registration.installing;

		serviceWorker?.addEventListener('statechange', () => {
			if (serviceWorker?.state === 'installed') {
				updateAvailable = true;
			}
		});
	});
}

export function updateSW() {
	if (updatingApp) {
		return;
	}

	if (serviceWorker) {
		updatingApp = true;
		serviceWorker.postMessage({ type: 'SKIP_WAITING' });

		navigator.serviceWorker.addEventListener('controllerchange', () => {
			window.location.reload();
		});
	}
}
