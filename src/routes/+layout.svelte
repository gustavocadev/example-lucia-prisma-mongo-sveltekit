<script>
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';

	export let data;
</script>

{#if data?.user}
	<Navbar />
{/if}
<main class="px-12">
	<slot />
</main>
