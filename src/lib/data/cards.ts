import type { Card } from '$lib/types';

export const CARDS: Card[] = [
	{
		id: 'balance',
		name: 'アーゼマの均衡',
		attributes: ['太陽', '情熱', '正義', '均衡'],
		image: '/images/cards/balance.png',
	},
	{
		id: 'spear',
		name: 'ハルオーネの槍',
		attributes: ['氷', '戦争', '勇猛'],
		image: '/images/cards/spear.png',
	},
	{
		id: 'arrow',
		name: 'オシュオンの矢',
		attributes: ['山', '海', '風', '旅人', '狩人'],
		image: '/images/cards/arrow.png',
	},
	{
		id: 'bole',
		name: '世界樹の幹',
		attributes: ['土', '豊穣', '時間'],
		image: '/images/cards/bole.png',
	},
	{
		id: 'spire',
		name: 'ビエルゴの塔',
		attributes: ['建築', '工芸', '彗星', '破壊', '雷'],
		image: '/images/cards/spire.png',
	},
	{
		id: 'ewer',
		name: 'サリャクの水瓶',
		attributes: ['水', '河川', '知力'],
		image: '/images/cards/ewer.png',
	},
];

export function getCardById(id: string): Card | undefined {
	return CARDS.find((card) => card.id === id);
}
