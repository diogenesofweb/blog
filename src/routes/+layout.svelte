<script>
	import '@kazkadien/svelte/styles.css';
	import '../css/app.css';
	// import '../css/kazkadien.css';
	import '../css/prism.css';
	import '../css/card.css';

	import MyHeader from '$lib/Header.svelte';
	import StopWar from '$lib/StopWar.svelte';
	import { AppWrapper, AppIcons } from '@kazkadien/svelte';

	import { page } from '$app/stores';
	const MY_ORIGIN = 'https://www.delphic.top';
	// page.subscribe((p) => console.log(p));
</script>

<svelte:head>
	<link rel="canonical" href="{MY_ORIGIN}{$page.url.pathname}" />
</svelte:head>

<AppWrapper>
	<AppIcons />
	<div id="app-container">
		<div id="view">
			<StopWar />

			<MyHeader />
			<main>
				<slot />
			</main>
		</div>

		<footer class="fce">
			<div>
				<span>Built with </span>
				<a class="link" href="https://kit.svelte.dev/"> SvelteKit </a> -
				<a class="link" href="https://github.com/diogenesofweb/blog">
					Github
				</a>
			</div>
		</footer>
	</div>
</AppWrapper>

<style>
	main {
		padding: 0 var(--sx-m);
		min-height: 50vh;
	}

	footer {
		gap: 1ch;

		min-height: 33vh;
		margin-top: 33vh;

		text-align: center;
		border-top: 1px solid var(--fl);
		/* border-top: 1px solid red; */

		background-color: var(--bg0);
	}

	.link {
		color: var(--fg-alpha);
	}
	.link:hover {
		color: var(--fg-gamma);
	}
</style>
