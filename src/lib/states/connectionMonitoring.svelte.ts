let deviceConnectionStatus: 'checking' | 'online' | 'offline' = $state('checking');

export function getDeviceConnectionStatus() {
	return deviceConnectionStatus;
}

async function verifyConnectionWithServer() {
	try {
		const response = await fetch('/ping.txt', {
			cache: 'no-store',
			method: 'HEAD'
		});
		return response.ok;
	} catch {
		return false;
	}
}

async function startConnectionRetryLoop() {
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

export async function connectionCheckTrigger() {
	const isConnected = await verifyConnectionWithServer();

	if (isConnected) {
		deviceConnectionStatus = 'online';
	} else {
		deviceConnectionStatus = 'offline';
		startConnectionRetryLoop();
	}
}

export function initializeConnectionMonitoring() {
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
