import { FortuneResult, type StoredData } from '$lib/types';
import { getJSTDateString } from '$lib/utils/date';

const STORAGE_KEY = 'sharlayan-fortune';

class Storage {
	private memoryFallback: StoredData | null = null;

	private isAvailable(): boolean {
		try {
			const testKey = '__test__';
			localStorage.setItem(testKey, testKey);
			localStorage.removeItem(testKey);
			return true;
		} catch {
			return false;
		}
	}

	save(data: StoredData): void {
		if (this.isAvailable()) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		} else {
			this.memoryFallback = data;
		}
	}

	load(): StoredData | null {
		if (this.isAvailable()) {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (!stored) return null;
			try {
				return JSON.parse(stored);
			} catch {
				return null;
			}
		}
		return this.memoryFallback;
	}

	clear(): void {
		if (this.isAvailable()) {
			localStorage.removeItem(STORAGE_KEY);
		}
		this.memoryFallback = null;
	}
}

const storage = new Storage();

export function saveResult(result: FortuneResult): void {
	storage.save({
		lastDrawnDate: getJSTDateString(),
		result,
	});
}

export function loadResult(): FortuneResult | null {
	const data = storage.load();
	return data ? FortuneResult.fromJSON(data.result) : null;
}

export function canDrawToday(): boolean {
	const data = storage.load();
	if (!data) return true;
	return data.lastDrawnDate !== getJSTDateString();
}

export function clearStorage(): void {
	storage.clear();
}
