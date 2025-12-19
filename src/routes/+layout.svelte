<script lang="ts">
import '../app.css';
import { base } from '$app/paths';
import Header from '$lib/components/Header.svelte';
import Footer from '$lib/components/Footer.svelte';

let { children } = $props();
</script>

<svelte:head>
	<title>シャーレアン式占星術</title>
	<meta name="description" content="FF14占星術師カードで今日の運勢を占おう" />
	<meta name="keywords" content="FF14,FFXIV,占星術師,占い,運勢,シャーレアン" />
	<meta name="author" content="pl4rd" />
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
	<link rel="canonical" href="https://fortune.pl4rd.com/" />

	<!-- OGP -->
	<meta property="og:title" content="シャーレアン式占星術" />
	<meta property="og:description" content="FF14占星術師カードで今日の運勢を占おう" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fortune.pl4rd.com/" />
	<meta property="og:image" content="https://fortune.pl4rd.com/favicon.png" />
	<meta property="og:site_name" content="シャーレアン式占星術" />
	<meta property="og:locale" content="ja_JP" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="シャーレアン式占星術" />
	<meta name="twitter:description" content="FF14占星術師カードで今日の運勢を占おう" />
	<meta name="twitter:image" content="https://fortune.pl4rd.com/favicon.png" />

	<!-- Theme -->
	<meta name="theme-color" content="#1a1a2e" />
</svelte:head>

<div data-theme="night" class="min-h-screen flex flex-col">
	<Header />
	{@render children()}
	<Footer />
</div>
