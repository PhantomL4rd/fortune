<script lang="ts">

interface Props {
	disabled: boolean;
	loading: boolean;
	onclick: () => void;
}

let { disabled, loading, onclick }: Props = $props();
</script>

<button class="btn btn-primary btn-lg" {disabled} {onclick}>
	{#if loading}
		<span class="loading loading-spinner"></span>
		カードを引いています...
	{:else if disabled}
		本日の占いは終了しました
	{:else}
		カードを引く
	{/if}
</button>
