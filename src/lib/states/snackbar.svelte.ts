type Type = 'success' | 'error' | 'info' | 'warning' | undefined;

interface Snackbar {
	id: number;
	message: string;
	type?: Type;
	timeout?: number;
}

let snackbars: Snackbar[] = $state([]);
let nextId = 0;

export function getSnackbars(): Snackbar[] {
	return snackbars;
}

export const snackbar = {
	show: (message: string | undefined, type: Type = 'info', timeout: number = 3000): void => {
		if (!message) {
			return;
		}

		const id = nextId++;
		snackbars.push({ id, message, type, timeout });

		if (timeout > 0) {
			setTimeout(() => {
				snackbar.dismiss(id);
			}, timeout);
		}
	},

	dismiss: (id: number): void => {
		snackbars = snackbars.filter((snackbar) => snackbar.id !== id);
	}
};

export function getColor(type: Type): string {
	switch (type) {
		case 'success':
			return 'bg-teal-600 text-white';
		case 'error':
			return 'bg-red-600 text-white';
		case 'warning':
			return 'bg-yellow-600 text-white';
		default:
			return 'bg-zinc-950 text-white';
	}
}

export function getCloseButtonColor(type: Type): string {
	switch (type) {
		case 'success':
			return 'text-teal-200 hover:text-teal-100';
		case 'error':
			return 'text-red-200 hover:text-red-100';
		case 'warning':
			return 'text-yellow-200 hover:text-yellow-100';
		default:
			return 'text-blue-200 hover:text-blue-100';
	}
}
