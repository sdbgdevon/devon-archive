<script lang="ts">
	import comOrange from '$lib/assets/com.svg';
	import Footer from '$lib/components/Footer.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={comOrange} />
</svelte:head>


<Marquee />
<Nav />
{@render children()}
<Footer />