<script lang="ts">
import { onMount } from 'svelte';
import type { FortuneResult as FortuneResultType } from '$lib/types';
import { drawFortune } from '$lib/services/fortune';
import { canDrawToday, loadResult, saveResult } from '$lib/services/storage';
import FortuneResult from '$lib/components/FortuneResult.svelte';
import DrawButton from '$lib/components/DrawButton.svelte';

let result: FortuneResultType | null = $state(null);
let canDraw = $state(true);
let loading = $state(false);
let initialized = $state(false);

onMount(() => {
	const savedResult = loadResult();
	if (savedResult) {
		result = savedResult;
	}
	canDraw = canDrawToday();
	initialized = true;
});

async function handleDraw() {
	if (!canDraw || loading) return;

	loading = true;
	try {
		const newResult = await drawFortune();
		result = newResult;
		saveResult(newResult);
		canDraw = false;
	} catch (error) {
		console.error('Failed to draw fortune:', error);
	} finally {
		loading = false;
	}
}
</script>

<main class="flex-1 container mx-auto px-4 py-8">
	{#if !initialized}
		<div class="flex justify-center">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else if result}
		<FortuneResult {result} />

		{#if canDraw}
			<div class="text-center mt-8">
				<DrawButton disabled={loading} {loading} onclick={handleDraw} />
			</div>
		{:else}
			<p class="text-center text-base-content/50 mt-6 text-sm">
				明日またカードを引きに来てください
			</p>
		{/if}
	{:else}
		<div class="text-center">
			<p class="mb-8 text-base-content/70">
				6枚の占星術師カードから1枚を引いて、今日の運勢を占いましょう
			</p>
			<DrawButton disabled={!canDraw || loading} {loading} onclick={handleDraw} />
		</div>
	{/if}
</main>
