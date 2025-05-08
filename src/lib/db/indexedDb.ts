import type { Product } from '$lib/states/product.svelte';
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

interface MyDB extends DBSchema {
	products: {
		key: number;
		value: Product & { insertionOrder?: number };
		indexes: {
			insertionOrderIndex: number;
		};
	};

	meta: {
		key: string;
		value: { key: string; value: number };
	};
}

let dbPromise: Promise<IDBPDatabase<MyDB>> | null = null;

function initDB() {
	if (!dbPromise) {
		dbPromise = openDB<MyDB>('maxsales-database', 1, {
			upgrade(db) {
				if (!db.objectStoreNames.contains('products')) {
					const store = db.createObjectStore('products', { keyPath: 'idProduto' });
					store.createIndex('insertionOrderIndex', 'insertionOrder');
				}

				if (!db.objectStoreNames.contains('meta')) {
					const metaStore = db.createObjectStore('meta', { keyPath: 'key' });
					metaStore.put({ key: 'insertionCounter', value: 0 });
				}
			}
		});
	}
	return dbPromise;
}

async function getNextInsertionOrder(): Promise<number> {
	const db = await initDB();
	const tx = db.transaction('meta', 'readwrite');
	const store = tx.objectStore('meta');
	const record = await store.get('insertionCounter');

	const nextValue = (record?.value ?? 0) + 1;
	await store.put({ key: 'insertionCounter', value: nextValue });

	await tx.done;
	return nextValue;
}

export async function addItem<T extends keyof MyDB>(
	storeName: T,
	item: MyDB[T]['value'],
	forceNewInsertionOrder = false
) {
	const db = await initDB();

	let insertionOrder: number | undefined;
	let existingItem: MyDB[T]['value'] | undefined;

	const storeKey =
		item[db.transaction(storeName as any).objectStore(storeName).keyPath as keyof typeof item];

	const checkTx = db.transaction(storeName as any, 'readonly');
	const checkStore = checkTx.objectStore(storeName);
	existingItem = await checkStore.get(storeKey);
	await checkTx.done;

	if (!existingItem || forceNewInsertionOrder) {
		insertionOrder = await getNextInsertionOrder();
	}

	const tx = db.transaction([storeName as any], 'readwrite');
	const store = tx.objectStore(storeName);

	const itemWithOrder = {
		...item,
		insertionOrder: insertionOrder ?? existingItem?.insertionOrder ?? 0
	};

	await store.put(itemWithOrder);
	await tx.done;
}

export async function getItem<T extends keyof MyDB>(storeName: T, key: MyDB[T]['key']) {
	const db = await initDB();
	const tx = db.transaction(storeName as any, 'readonly');
	const store = tx.objectStore(storeName);
	return store.get(key);
}

export async function getAllItems<T extends keyof MyDB>(storeName: T) {
	const db = await initDB();
	const tx = db.transaction(storeName as any, 'readonly');
	const store = tx.objectStore(storeName);
	return store.getAll();
}

export async function getAllItemsByInsertionOrder<T extends keyof MyDB>(storeName: T) {
	const db = await initDB();
	const tx = db.transaction(storeName as any, 'readonly');
	const store = tx.objectStore(storeName);
	const index = store.index('insertionOrderIndex' as any);
	return index.getAll();
}

export async function deleteItem<T extends keyof MyDB>(storeName: T, key: MyDB[T]['key']) {
	const db = await initDB();
	const tx = db.transaction(storeName as any, 'readwrite');
	const store = tx.objectStore(storeName);
	await store.delete(key);
	await tx.done;
}
