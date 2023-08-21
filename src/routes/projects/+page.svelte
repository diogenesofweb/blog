<script>
	const arr = [
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
			link: 'https://www.tabulamax.com/',
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
			name: 'Топ Курс',
			desc: 'Курс валют у банках України',
			link: 'https://www.kursvalyut.top/',
			repo: 'https://github.com/diogenesofweb/kurs-valyut',
		},
	];
</script>

<svelte:head>
	<title>Projects</title>
	<meta
		name="description"
		content="My beloved projects: webapps, extentions, libraries. Mostly open source and built with Javascript and SvelteJS."
	/>
</svelte:head>

<article class="container">
	<h1 class="tac beta">My Projects</h1>

	{#each arr as proj}
		<section class="card alpha" lang={proj.lang || 'en'}>
			<h2 class="f-serif">
				<a class="link" href={proj.link}> {proj.name} </a>
			</h2>

			<p>{proj.desc}</p>

			<div class="tags">
				{#if proj.repo}
					<a class="link" href={proj.repo}> Repo </a>
				{/if}

				{#if proj.npm}
					<a class="link" href={proj.npm}> NPM </a>
				{/if}
			</div>
		</section>
	{/each}
</article>

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
		color: var(--fg1);
	}

	/* h2 .link { */
	/* border-bottom: 2px solid currentColor; */
	/* text-decoration-line: underline; */
	/* text-decoration-thickness: max(2px, 0.15em); */
	/* text-underline-offset: 6px; */
	/* } */
</style>
