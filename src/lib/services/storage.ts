import type { FortuneResult, StoredData } from '$lib/types';

const STORAGE_KEY = 'sharlayan-fortune';

function getJSTDateString(): string {
	const now = new Date();
	const jstOffset = 9 * 60;
	const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
	const jstMinutes = utcMinutes + jstOffset;

	const jstDate = new Date(now);
	if (jstMinutes >= 24 * 60) {
		jstDate.setUTCDate(jstDate.getUTCDate() + 1);
	}

	const year = jstDate.getUTCFullYear();
	const month = String(jstDate.getUTCMonth() + 1).padStart(2, '0');
	const day = String(jstDate.getUTCDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

function isLocalStorageAvailable(): boolean {
	try {
		const testKey = '__test__';
		localStorage.setItem(testKey, testKey);
		localStorage.removeItem(testKey);
		return true;
	} catch {
		return false;
	}
}

let memoryStorage: StoredData | null = null;

export function saveResult(result: FortuneResult): void {
	const data: StoredData = {
		lastDrawnDate: getJSTDateString(),
		result,
	};

	if (isLocalStorageAvailable()) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} else {
		memoryStorage = data;
	}
}

export function loadResult(): FortuneResult | null {
	let data: StoredData | null = null;

	if (isLocalStorageAvailable()) {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				data = JSON.parse(stored);
			} catch {
				return null;
			}
		}
	} else {
		data = memoryStorage;
	}

	if (!data) {
		return null;
	}

	return data.result;
}

export function canDrawToday(): boolean {
	let data: StoredData | null = null;

	if (isLocalStorageAvailable()) {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				data = JSON.parse(stored);
			} catch {
				return true;
			}
		}
	} else {
		data = memoryStorage;
	}

	if (!data) {
		return true;
	}

	const today = getJSTDateString();
	return data.lastDrawnDate !== today;
}

export function clearStorage(): void {
	if (isLocalStorageAvailable()) {
		localStorage.removeItem(STORAGE_KEY);
	}
	memoryStorage = null;
}
