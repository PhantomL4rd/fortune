export interface Card {
	id: string;
	name: string;
	attributes: string[];
	image: string;
}

export interface FortunePattern {
	fortune: string;
	action: string;
}

export interface FortuneData {
	generatedAt: string;
	date: string;
	cards: Record<string, FortunePattern[]>;
}

export interface Dye {
	name: string;
	rgb: { r: number; g: number; b: number };
}

export interface FortuneResult {
	card: Card;
	pattern: FortunePattern;
	luckyDye: Dye | null;
	drawnAt: string;
}

export interface StoredData {
	lastDrawnDate: string;
	result: FortuneResult;
}
