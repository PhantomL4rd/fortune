import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

const CARDS = [
	{
		id: 'balance',
		name: 'アーゼマの均衡',
		attributes: ['太陽', '情熱', '正義', '均衡'],
	},
	{ id: 'spear', name: 'ハルオーネの槍', attributes: ['氷', '戦争', '勇猛'] },
	{
		id: 'arrow',
		name: 'オシュオンの矢',
		attributes: ['山', '海', '風', '旅人', '狩人'],
	},
	{ id: 'bole', name: '世界樹の幹', attributes: ['土', '豊穣', '時間'] },
	{
		id: 'spire',
		name: 'ビエルゴの塔',
		attributes: ['建築', '工芸', '彗星', '破壊', '雷'],
	},
	{ id: 'ewer', name: 'サリャクの水瓶', attributes: ['水', '河川', '知力'] },
];

const PATTERNS_PER_CARD = 3;

async function generateFortuneForCard(genAI, card) {
	const model = genAI.getGenerativeModel({
		model: 'gemini-2.0-flash',
		generationConfig: {
			responseMimeType: 'application/json',
		},
	});

	const prompt = `あなたは占星術師です。以下の属性を持つカードの占い結果を${PATTERNS_PER_CARD}パターン生成してください。

カードの属性: ${card.attributes.join('、')}

各パターンには以下を含めてください:
- fortune: 総合運（属性に基づいた250〜300文字程度の運勢メッセージ。詳しく丁寧に書いてください。神様の名前や固有名詞は使わず、属性のイメージを活かしてください）
- action: 開運アクション（具体的な行動提案、30〜50文字程度）

JSON配列形式で出力してください。
[{"fortune": "...", "action": "..."}, ...]`;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();

	return JSON.parse(text);
}

async function main() {
	const apiKey = process.env.GEMINI_API_KEY;
	if (!apiKey) {
		console.error('GEMINI_API_KEY is not set');
		process.exit(1);
	}

	const genAI = new GoogleGenerativeAI(apiKey);
	const fortuneData = {
		generatedAt: new Date().toISOString(),
		date: new Date().toISOString().split('T')[0],
		cards: {},
	};

	console.log('Generating fortune data...');

	for (const card of CARDS) {
		console.log(`Generating for ${card.name}...`);
		try {
			const patterns = await generateFortuneForCard(genAI, card);
			fortuneData.cards[card.id] = patterns;
			console.log(`  Generated ${patterns.length} patterns`);
		} catch (error) {
			console.error(`  Error generating for ${card.name}:`, error.message);
			throw error;
		}
	}

	const outputPath = path.join(process.cwd(), 'static', 'data', 'fortune.json');
	fs.writeFileSync(outputPath, JSON.stringify(fortuneData, null, 2));
	console.log(`Fortune data saved to ${outputPath}`);
}

main().catch((error) => {
	console.error('Generation failed:', error);
	process.exit(1);
});
