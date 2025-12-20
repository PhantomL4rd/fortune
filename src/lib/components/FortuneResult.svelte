<script lang="ts">
import type { FortuneResult } from '$lib/types';
import { base } from '$app/paths';
import ShareButton from './ShareButton.svelte';
import { Star, Zap, Palette } from 'lucide-svelte';

interface Props {
	result: FortuneResult;
}

let { result }: Props = $props();
</script>

<div class="card bg-base-200 shadow-xl max-w-md mx-auto">
	<figure class="px-6 pt-6">
		<img src="{base}{result.card.image}" alt={result.card.name} class="rounded-xl w-24 h-auto" />
	</figure>
	<div class="card-body items-center text-center">
		<h2 class="card-title text-2xl">{result.card.name}</h2>

		<div class="divider"></div>

		<div class="space-y-4 w-full">
			<div>
				<h3 class="font-bold text-lg mb-2 flex items-center justify-center gap-2">
					<Star class="w-5 h-5 text-warning" />
					今日の運勢
				</h3>
				<p class="text-base-content/80 text-left">{result.pattern.fortune}</p>
			</div>

			<div>
				<h3 class="font-bold text-lg mb-2 flex items-center justify-center gap-2">
					<Zap class="w-5 h-5 text-success" />
					開運アクション
				</h3>
				<p class="text-primary">{result.pattern.action}</p>
			</div>

			{#if result.luckyDye}
				<div>
					<h3 class="font-bold text-lg mb-2 flex items-center justify-center gap-2">
						<Palette class="w-5 h-5 text-info" />
						ラッキーカララント
					</h3>
					<div class="flex items-center justify-center gap-3">
						<div
							class="w-8 h-8 rounded-full border-2 border-base-content/20"
							style="background-color: rgb({result.luckyDye.rgb.r}, {result.luckyDye.rgb.g}, {result.luckyDye.rgb.b});"
						></div>
						<span class="text-base-content/80">{result.luckyDye.name}</span>
					</div>
				</div>
			{/if}
		</div>

		<div class="card-actions justify-center mt-4">
			<ShareButton {result} />
		</div>
	</div>
</div>
