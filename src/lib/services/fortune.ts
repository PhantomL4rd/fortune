import type {
	Card,
	FortuneData,
	FortunePattern,
	FortuneResult,
} from '$lib/types';
import { CARDS } from '$lib/data/cards';
import { fetchDyes, getRandomDye } from './dyes';

let cachedFortuneData: FortuneData | null = null;

export async function fetchFortuneData(): Promise<FortuneData> {
	if (cachedFortuneData) {
		return cachedFortuneData;
	}

	const response = await fetch('/data/fortune.json');
	if (!response.ok) {
		throw new Error('Failed to fetch fortune data');
	}

	cachedFortuneData = await response.json();
	return cachedFortuneData!;
}

export function clearFortuneCache(): void {
	cachedFortuneData = null;
}

export function getRandomCard(): Card {
	const index = Math.floor(Math.random() * CARDS.length);
	return CARDS[index];
}

export function getRandomPattern(patterns: FortunePattern[]): FortunePattern {
	const index = Math.floor(Math.random() * patterns.length);
	return patterns[index];
}

export async function drawFortune(): Promise<FortuneResult> {
	const [fortuneData, dyes] = await Promise.all([
		fetchFortuneData(),
		fetchDyes(),
	]);

	const card = getRandomCard();
	const patterns = fortuneData.cards[card.id] || [];

	if (patterns.length === 0) {
		throw new Error(`No patterns found for card: ${card.id}`);
	}

	const pattern = getRandomPattern(patterns);
	const luckyDye = getRandomDye(dyes);

	return {
		card,
		pattern,
		luckyDye,
		drawnAt: new Date().toISOString(),
	};
}
