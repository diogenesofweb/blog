<script>
	const arr = [
		{
			link: 'https://www.emojion.top/?view=search',
			name: 'Emoji copy and paste',
			desc: 'Generate color palettes and gradients. Explore shades, tints and tones.',
		},
		{
			name: 'HTML Hyperlinks Viewer | Chrome Extension',
			desc: 'Extract and view links in a side panel.',
			link: 'https://chromewebstore.google.com/detail/link-viewer/mpmngcbadijpkifafmbiioghlnbbgnam',
			repo: '',
			npm: '',
		},
		{
			link: 'https://generator.colorome.com/',
			name: 'Color Palette Generator',
			desc: 'Generate color palettes and gradients. Explore shades, tints and tones.',
		},
		{
			name: 'SVG Icon Explorer',
			desc: 'Easily search, copy, download SVG icons form free libraries (Bootstrap, Material and more). Group icons in collections and generate SVG sprites.',
			link: 'https://icons.delphic.top',
			repo: 'https://github.com/diogenesofweb/icon-explorer',
		},
		{
			name: 'Link List | Chrome Extension',
			desc: 'Show all hyperlinks in one place, grouped by internal, external, emails and phone numbers.',
			link: 'https://chrome.google.com/webstore/detail/link-list/caifphhfadgaiddefealbdeakngdfdec',
			repo: 'https://github.com/diogenesofweb/link-list',
			npm: '',
		},
		{
			name: 'Functional JSON Viewer | Chrome Extension',
			desc: 'Explore JSON data, generate sreenshots, Typescript interfaces, Golang structs. Vim-like keymaps.',
			link: 'https://chrome.google.com/webstore/detail/functional-json-viewer/cokkmplppnaigoodkkjopoblfaelibab',
			repo: 'https://github.com/diogenesofweb/fjv',
			npm: '',
		},
		{
			name: 'JSON Viewer | WebApp',
			desc: 'Explore JSON data, generate sreenshots, Typescript interfaces, Golang structs. Vim-like keymaps. History.',
			link: 'https://json-viewer.delphic.top',
			repo: 'https://github.com/diogenesofweb/json-in-details',
		},
		{
			name: 'json-in-details | JS library',
			desc: 'Simple and preformant JSON viewer with a extendable functionally and beautiful light and dark theme',
			link: 'https://github.com/diogenesofweb/json-in-details/blob/main/README.md',
			repo: 'https://github.com/diogenesofweb/json-in-details/tree/main/src/lib',
			npm: 'https://www.npmjs.com/package/json-in-details',
		},

		{
			name: 'Hotatap | WebApp',
			desc: 'Web-client to debug REST API',
			link: 'https://hotatap.delphic.top/app',
			repo: 'https://github.com/diogenesofweb/hotatap',
			npm: '',
		},
		{
			name: 'Tabulamax | WebApp',
			desc: 'Quickly design DB tables and generate code snippets for migrations (SQL, Knex.js)',
			link: 'https://tabulamax.delphic.top',
			repo: 'https://github.com/tabulamax/app',
			npm: '',
		},
		{
			name: 'Online Timers | WebApp',
			desc: 'Pomodoro, countdown, stopwatch timers.',
			link: 'https://www.timerone.com',
			repo: 'https://github.com/diogenesofweb/focus',
			npm: '',
		},
		{
			name: 'Dwarform | WebApp',
			desc: 'Generate Svelte, Vue, HTML code snippets for making forms with Bootstrap, Bulma or custom CSS',
			link: 'https://dwarform.delphic.top/',
			repo: 'https://github.com/diogenesofweb/dwarform',
			npm: '',
		},
		{
			name: 'Kazkadien',
			desc: 'Personal CSS & Svelte Component Library',
			link: 'https://kazkadien.pages.dev/',
			// repo: 'https://github.com/kazkadien/svelte',
			npm: 'https://www.npmjs.com/package/@kazkadien/svelte',
		},

		{
			lang: 'uk',
			name: 'юКалендар',
			desc: 'Який сьогодні день?',
			link: 'https://www.ukalendar.com',
			// repo: 'https://github.com/diogenesofweb/kurs-valyut',
		},
		{
			lang: 'uk',
			name: 'Топ Курс',
			desc: 'Курс валют у банках України',
			link: 'https://www.kursvalyut.top/',
			repo: 'https://github.com/diogenesofweb/kurs-valyut',
		},
		{
			lang: 'uk',
			name: 'Прапорія',
			desc: 'Прапори всіх країн світу',
			link: 'https://www.praporia.com/'
		},
		{
			lang: 'uk',
			name: 'Колором',
			desc: 'Все про кольори',
			link: 'https://www.colorome.com/'
		},
	];
</script>

<svelte:head>
	<title>My Projects</title>
	<meta
		name="description"
		content="My beloved projects: webapps, extentions, libraries. Mostly open source and built with Javascript and SvelteJS."
	/>
</svelte:head>

<div class="container">
	<h1 class="tac beta">My Projects</h1>

	{#each arr as proj}
		<article class="card alpha" lang={proj.lang || 'en'}>
			<header>
				<h2 class="f-serif">
					<a class="link" href={proj.link}>
						{proj.name}
					</a>
				</h2>
				<p>{proj.desc}</p>
			</header>

			<div class="tags">
				{#if proj.repo}
					<a class="link" href={proj.repo}> Repo </a>
				{/if}

				{#if proj.npm}
					<a class="link" href={proj.npm}> NPM </a>
				{/if}
			</div>
		</article>
	{/each}
</div>

<style>
	.container {
		margin-inline: auto;
		max-width: 800px;
		display: grid;
		gap: 2rem;

		/* background-color: rgba(0, 255, 255, 0.1); */
	}

	h1 {
		padding-top: 1rem;
		/* color: var(--fg1); */
	}
	h2 {
		color: inherit;
		/* color: var(--clr, var(--fg-alpha)); */
	}

	a.link {
		/* color: var(--fg); */
		/* color: var(--fg-beta); */
		color: var(--fg-alpha);

		&:is(:hover, :focus-visible) {
			color: var(--fg-gamma);
			/* color: var(--fg-alpha); */
			/* --clr: var(--fg-alpha); */
		}
	}

	/* h2 .link { */
	/* border-bottom: 2px solid currentColor; */
	/* text-decoration-line: underline; */
	/* text-decoration-thickness: max(2px, 0.15em); */
	/* text-underline-offset: 6px; */
	/* } */
</style>
