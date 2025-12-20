import { Dye, type DyeData } from '$lib/types';

const DYES_API_URL = 'https://colorant-picker.pl4rd.com/data/dyes.json';

export async function fetchDyes(): Promise<Dye[]> {
	try {
		const response = await fetch(DYES_API_URL);
		if (!response.ok) {
			throw new Error('Failed to fetch dyes data');
		}

		const data: { dyes: DyeData[] } = await response.json();
		return data.dyes.map((dye) => Dye.fromJSON(dye));
	} catch (error) {
		console.error('Failed to fetch dyes:', error);
		return [];
	}
}
