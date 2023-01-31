<script>
	const arr = [
		{
			name: 'Hotatap',
			desc: 'Web client for REST API testing',
			link: 'https://hotatap.pages.dev/app',
			repo: 'https://github.com/diogenesofweb/hotatap',
			npm: '',
		},
		{
			name: 'Tabulamax',
			desc: 'Quickly design DB tables and generate code snippets for migrations (SQL, Knex.js)',
			link: 'https://www.tabulamax.com/',
			repo: 'https://github.com/tabulamax/app',
			npm: '',
		},
		{
			name: 'Focus',
			desc: 'Productivity timer with focus on breaks',
			link: 'https://focus.delphic.top/',
			repo: 'https://github.com/diogenesofweb/focus',
			npm: '',
		},
		{
			name: 'Dwarform',
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
	];
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="My side projects" />
</svelte:head>

<div class="container">
	<h1>My Projects:</h1>

	{#each arr as proj}
		<div class="card">
			<h2 class="font2">
				<a
					class="link"
					href={proj.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					{proj.name}
				</a>
			</h2>

			<p>{proj.desc}</p>

			<div class="tags">
				{#if proj.repo}
					<a
						class="link"
						href={proj.repo}
						target="_blank"
						rel="noopener noreferrer"
					>
						Repo
					</a>
				{/if}

				{#if proj.npm}
					<a
						class="link"
						href={proj.npm}
						target="_blank"
						rel="noopener noreferrer"
					>
						NPM
					</a>
				{/if}
			</div>
		</div>
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
		color: var(--text);
	}

	h2 .link {
		border-bottom: 2px solid currentColor;
	}
</style>
