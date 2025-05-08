let deviceConnectionStatus: 'checking' | 'online' | 'offline' = $state('checking');
const serverConnectionCheckTimeout = 2000;

export function getDeviceConnectionStatus() {
	return deviceConnectionStatus;
}

async function verifyConnectionWithServer(): Promise<boolean> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), serverConnectionCheckTimeout);

	try {
		const response = await fetch('/ping.txt', {
			cache: 'no-store',
			method: 'HEAD',
			signal: controller.signal
		});
		clearTimeout(timeoutId);
		return response.ok;
	} catch (error) {
		return false;
	}
}

async function startConnectionRetryLoop(): Promise<void> {
	const interval = setInterval(async () => {
		if (navigator.onLine) {
			const isConnected = await verifyConnectionWithServer();

			if (isConnected) {
				deviceConnectionStatus = 'online';
				clearInterval(interval);
			} else {
				deviceConnectionStatus = 'offline';
			}
		} else {
			deviceConnectionStatus = 'offline';
		}
	}, 2000);
}

export async function connectionCheckTrigger(): Promise<void> {
	const isConnected = await verifyConnectionWithServer();

	if (isConnected) {
		deviceConnectionStatus = 'online';
	} else {
		deviceConnectionStatus = 'offline';
		startConnectionRetryLoop();
	}
}

export function initializeConnectionMonitoring(): () => void {
	const evaluateAndUpdateStatus = async () => {
		if (navigator.onLine) {
			connectionCheckTrigger();
		} else {
			deviceConnectionStatus = 'offline';
			startConnectionRetryLoop();
		}
	};

	evaluateAndUpdateStatus();

	window.addEventListener('online', evaluateAndUpdateStatus);
	window.addEventListener('offline', () => (deviceConnectionStatus = 'offline'));

	return () => {
		window.removeEventListener('online', evaluateAndUpdateStatus);
		window.removeEventListener('offline', () => (deviceConnectionStatus = 'offline'));
	};
}
