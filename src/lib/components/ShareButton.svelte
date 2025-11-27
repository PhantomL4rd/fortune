<script lang="ts">
import type { FortuneResult } from '$lib/types';
import { generateShareText, copyToClipboard } from '$lib/services/share';
import { Share2, Check } from 'lucide-svelte';

interface Props {
	result: FortuneResult;
}

let { result }: Props = $props();
let copied = $state(false);

async function handleShare() {
	const siteUrl = window.location.href;
	const text = generateShareText(result, siteUrl);
	const success = await copyToClipboard(text);

	if (success) {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
}
</script>

<button class="btn btn-outline btn-sm" onclick={handleShare}>
	{#if copied}
		<Check class="w-4 h-4" />
		コピーしました
	{:else}
		<Share2 class="w-4 h-4" />
		シェア
	{/if}
</button>
