import { FortuneResult, type FortuneData } from '$lib/types';
import { base } from '$app/paths';
import { CARDS } from '$lib/data/cards';
import { fetchDyes } from './dyes';

async function fetchFortuneData(): Promise<FortuneData> {
	const response = await fetch(`${base}/data/fortune.json`);
	if (!response.ok) {
		throw new Error('Failed to fetch fortune data');
	}
	return response.json();
}

function getRandomItem<T>(items: T[]): T {
	const index = Math.floor(Math.random() * items.length);
	return items[index];
}

export async function drawFortune(): Promise<FortuneResult> {
	const [fortuneData, dyes] = await Promise.all([
		fetchFortuneData(),
		fetchDyes(),
	]);

	const card = getRandomItem(CARDS);
	const patterns = fortuneData.cards[card.id] || [];

	if (patterns.length === 0) {
		throw new Error(`No patterns found for card: ${card.id}`);
	}

	const pattern = getRandomItem(patterns);
	const luckyDye = dyes.length > 0 ? getRandomItem(dyes) : null;

	return new FortuneResult(card, pattern, luckyDye, new Date().toISOString());
}
