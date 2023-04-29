<script>
	import '@kazkadien/svelte/styles.css';
	import '../css/app.css';
	// import '../css/kazkadien.css';
	import '../css/prism.css';
	import '../css/card.css';

	import MyHeader from '$lib/Header.svelte';
	import StopWar from '$lib/StopWar.svelte';
	import { AppWrapper } from '@kazkadien/svelte';
</script>

<AppWrapper checkTheme={false}>
	<div id="app-container">
		<div id="view">
			<StopWar />

			<MyHeader />
			<main>
				<slot />
			</main>
		</div>

		<footer class="fce">
			<div>DelphicTop,</div>

			<div>
				<span> built with </span>
				<a
					class="link"
					href="https://kit.svelte.dev/"
					target="_blank"
					rel="noopener noreferrer"
				>
					SvelteKit
				</a>
				,
			</div>

			<div>
				<a
					class="link"
					href="https://github.com/diogenesofweb/blog"
					target="_blank"
					rel="noopener noreferrer"
				>
					Repo in Github
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
		border-top: 1px solid var(--bga);
		/* border-top: 1px solid red; */

		background-color: var(--bg2);
	}

	.link {
		color: var(--fg-alpha);
	}
	.link:hover {
		color: var(--fg-gamma);
	}
</style>
