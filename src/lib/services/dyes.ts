import type { Dye } from '$lib/types';

const DYES_API_URL =
	'https://phantoml4rd.github.io/ffxiv-colorant-picker/data/dyes.json';

interface RawDye {
	id: string;
	name: string;
	category: string;
	hex: string;
	rgb: { r: number; g: number; b: number };
}

let cachedDyes: Dye[] | null = null;

export async function fetchDyes(): Promise<Dye[]> {
	if (cachedDyes) {
		return cachedDyes;
	}

	try {
		const response = await fetch(DYES_API_URL);
		if (!response.ok) {
			throw new Error('Failed to fetch dyes data');
		}

		const data: { dyes: RawDye[] } = await response.json();
		cachedDyes = data.dyes.map((dye) => ({
			id: dye.id,
			name: dye.name,
			category: dye.category,
			hex: dye.hex,
			rgb: dye.rgb,
		}));

		return cachedDyes;
	} catch (error) {
		console.error('Failed to fetch dyes:', error);
		return [];
	}
}

export function getRandomDye(dyes: Dye[]): Dye | null {
	if (dyes.length === 0) {
		return null;
	}
	const index = Math.floor(Math.random() * dyes.length);
	return dyes[index];
}
