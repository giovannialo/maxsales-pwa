/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

// Cria um nome de cache único para essa implantação
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // o próprio app
	...files // tudo que está em `static`
];

self.addEventListener('install', (event) => {
	// Cria um novo cache e adiciona todos os arquivos a ele
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	// Remove dados em cache anteriores do disco
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	// ignora requisições POST etc
	if (event.request.method !== 'GET') {
		return;
	}

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		// `build`/`files` sempre podem ser servidos a partir do cache
		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);

			if (response) {
				return response;
			}
		}

		// para todo o resto, tenta a rede primeiro, mas
		// recorre ao cache se estiver offline
		try {
			const response = await fetch(event.request);

			// se estivermos offline, fetch pode retornar um valor que não é uma Response
			// em vez de lançar um erro - e não podemos passar esse valor para respondWith
			if (!(response instanceof Response)) {
				throw new Error('invalid response from fetch');
			}

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			// se não houver cache, então apenas lança o erro
			// pois não há nada que possamos fazer para responder a essa requisição
			throw err;
		}
	}

	event.respondWith(respond());
});

// Pula o estado de espera e ativa o novo Service Worker imediatamente
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
