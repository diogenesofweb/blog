<script>
	import '../css/reset.css'
	import '../css/vars.css'
	import '../css/app.css'
	import '../css/utils.css'
	// import '../css/highlight.css'

	import Header from '$lib/header.svelte'
</script>

<div class="wrap">
	<Header />

	<main>
		<slot />
	</main>
</div>

<footer class="ce">
	<p>DelphicTop</p>
</footer>

<style>
	.wrap {
		min-height: 100vh;
	}

	main {
		padding: 0 var(--space-x) max(6rem, 33vh);
	}

	footer {
		min-height: 33vh;
		text-align: center;
		border-top: 1px solid var(--line);

		background-color: var(--bg-darker);
	}

	:global(html.dark) footer {
		background-color: var(--bg-darker);
	}
</style>
