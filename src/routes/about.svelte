<script context="module">
	import { browser, dev } from '$app/env'

	export const hydrate = dev
	export const router = browser
	export const prerender = true
</script>

<script>
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>Future About Page</h1>

<article class="brand">
	<p>some <span class="accentuate">text</span></p>
	<p>some <span class="accentuate">text</span></p>
</article>

<style>
	h1 {
		color: lightpink;
	}
</style>
