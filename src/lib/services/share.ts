import type { FortuneResult } from '$lib/types';

export function generateShareText(
	result: FortuneResult,
	siteUrl: string,
): string {
	const action =
		result.pattern.action.length > 50
			? result.pattern.action.slice(0, 47) + '...'
			: result.pattern.action;

	return `今日のカード: ${result.card.name}　開運アクション: ${action} ${siteUrl}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(text);
			return true;
		}

		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.left = '-9999px';
		document.body.appendChild(textArea);
		textArea.select();
		const success = document.execCommand('copy');
		document.body.removeChild(textArea);
		return success;
	} catch {
		return false;
	}
}
