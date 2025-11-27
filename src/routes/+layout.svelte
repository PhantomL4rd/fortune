<script lang="ts">
import '../app.css';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';

let { children } = $props();
</script>

<svelte:head>
	<title>シャーレアン式占星術</title>
	<meta name="description" content="FF14占星術師カードで今日の運勢を占おう" />
	<link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<div data-theme="night" class="min-h-screen flex flex-col">
	<Header />
	{@render children()}
	<Footer />
</div>
