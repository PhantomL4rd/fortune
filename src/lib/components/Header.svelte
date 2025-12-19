<script lang="ts">
import { Moon, Sparkles, Menu, Palette } from 'lucide-svelte';
</script>

<header class="navbar bg-primary text-primary-content mb-8">
	<div class="container mx-auto flex items-center">
		<div class="flex-1">
			<a href="/" class="text-xl font-bold flex items-center gap-2">
				<Moon class="w-6 h-6" />
				シャーレアン式占星術
			</a>
		</div>
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost">
					<Menu class="w-6 h-6" />
				</div>
				<ul
					tabindex="0"
					class="dropdown-content menu bg-base-200 text-base-content rounded-box z-10 w-52 p-2 shadow mt-2"
				>
					<li>
						<a
							href="https://colorant-picker.pl4rd.com/"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2"
						>
							<Palette class="w-5 h-5" />
							カララントピッカー
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</header>
