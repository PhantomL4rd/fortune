export interface RGB {
	r: number;
	g: number;
	b: number;
}

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

export interface DyeData {
	name: string;
	rgb: RGB;
}

export class Dye {
	readonly name: string;
	readonly rgb: RGB;

	constructor(name: string, rgb: RGB) {
		this.name = name;
		this.rgb = rgb;
	}

	get hex(): string {
		const toHex = (n: number) => n.toString(16).padStart(2, '0');
		return `#${toHex(this.rgb.r)}${toHex(this.rgb.g)}${toHex(this.rgb.b)}`;
	}

	static fromJSON(data: DyeData): Dye {
		return new Dye(data.name, data.rgb);
	}
}

export interface FortuneResultData {
	card: Card;
	pattern: FortunePattern;
	luckyDye: DyeData | null;
	drawnAt: string;
}

export class FortuneResult {
	readonly card: Card;
	readonly pattern: FortunePattern;
	readonly luckyDye: Dye | null;
	readonly drawnAt: string;

	constructor(card: Card, pattern: FortunePattern, luckyDye: Dye | null, drawnAt: string) {
		this.card = card;
		this.pattern = pattern;
		this.luckyDye = luckyDye;
		this.drawnAt = drawnAt;
	}

	toShareText(siteUrl: string): string {
		const action =
			this.pattern.action.length > 50
				? this.pattern.action.slice(0, 47) + '...'
				: this.pattern.action;
		return `今日のカード: ${this.card.name}　開運アクション: ${action} ${siteUrl}`;
	}

	static fromJSON(data: FortuneResultData): FortuneResult {
		return new FortuneResult(
			data.card,
			data.pattern,
			data.luckyDye ? Dye.fromJSON(data.luckyDye) : null,
			data.drawnAt,
		);
	}
}

export interface StoredData {
	lastDrawnDate: string;
	result: FortuneResultData;
}
