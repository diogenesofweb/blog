<script context="module">
	import { browser, dev } from '$app/env'
	// export const hydrate = dev
	// export const router = browser

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true
</script>

<script>
	// import BtnGroup from '$lib/BtnGroup.svelte'
	// import Colors from '$lib/Colors.svelte'
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>Future About Page</h1>

<div class="ce g1">
	<button class="btn">click</button>
	<button class="btn">click</button>
	<button class="btn brand">click</button>
</div>

<!-- <BtnGroup />
<Colors /> -->
<style>
	/* PRESET */
	button {
		border: none;
		outline: none;
		cursor: pointer;
		text-decoration: none;
	}

	button,
	button:hover,
	button:focus {
		outline: none;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	/* PRESET */

	/* COLORS */
	:root {
		--btn-color: black;
		--btn-bg: hsl(0, 0%, 80%);
		--btn-bg-hover: hsl(0, 0%, 70%);
	}

	:global(html.dark) {
		--btn-color: white;
		--btn-bg: hsl(150, 20%, 10%);
		--btn-bg-hover: hsl(150, 20%, 12%);
	}
	/* COLORS */

	:root {
		--btn-min-height: 3em;
		--btn-outline-shadow-size: 0 0 0.05rem 0.15rem;
	}

	.btn {
		position: relative;

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 1em;

		min-height: var(--btn-min-height);

		padding: 0.1em 1.5em;

		color: var(--btn-color);
		background-color: var(--btn-bg);

		text-transform: uppercase;
		line-height: 1;
		letter-spacing: 2px;

		border-radius: 0.5rem;

		/* font-size: calc(1rem + 2px); */

		/* if `outlined` btns is needed: */
		/* border: thin solid transparent; */
		/* then change border-color on `outlined` class .. */
	}

	/* HOVER & FOCUS */
	.btn:hover {
		background-color: var(--btn-bg-hover);
	}

	.btn:focus-visible {
		z-index: 1;
		/* ajust --color depending on btn background, here for blue one */
		--btn-outline-shadow-color: hsla(240, 100%, 50%, 0.5);
		box-shadow: var(--btn-outline-shadow-size) var(--btn-outline-shadow-color);
	}

	:global(html.dark) .btn:focus-visible {
		/* reset to gray shadow, colored one have bad visiblity on dark background*/
		--btn-outline-shadow-color: hsla(0, 0%, 80%, 0.5);
	}

	.btn:focus:not(:focus-visible) {
		z-index: 1;
		filter: brightness(90%);
	}
	/* HOVER & FOCUS */

	/* .btn.brand {
		--btn-color: white;
		--btn-bg: hsl(280, 50%, 35%);
		--btn-bg-hover: hsl(280, 30%, 40%);
		--btn-outline-shadow-color: hsl(280, 30%, 35%, 0.5);
	} */

	/* even better */
	.btn {
		--hue-sat-brand: 280, 50%;
	}

	.btn.brand {
		--btn-color: white;
		--btn-bg: hsl(var(--hue-sat-brand), 35%);
		--btn-bg-hover: hsl(var(--hue-sat-brand), 45%);
		--btn-outline-shadow-color: hsla(var(--hue-sat-brand), 35%, 0.5);
	}
</style>
