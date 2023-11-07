<script>
	const my_projects = [
		{
			url: 'https://generator.colorome.com/',
			name: 'Color Palette Generator',
			title:
				'Generate color palettes and gradients. Explore shades, tints and tones.',
		},
		{
			url: 'https://icons.delphic.top',
			name: 'Icon Explorer',
			title:
				'Easily search, copy, download SVG icons from free libraries (Bootstrap, Material and more). Group icons in collections and generate SVG sprites.',
		},
		{
			url: 'https://json-viewer.delphic.top',
			name: 'JSON Viewer',
			title:
				'View, explore, convert JSON data. Copy nodes & path. VIM inspired keymaps.',
		},
		{
			url: 'https://hotatap.delphic.top/app',
			name: 'HoTaTaP',
			title: 'Test and dubug REST API in the browser',
		},
		{
			url: 'https://tabulamax.delphic.top',
			name: 'Tabulamax',
			title:
				'Design DB tables, generate SQL and KnexJS migraions, TS interfaces, GO structs.',
		},

		{
			name: 'TimerOne',
			title:
				'Collection of online timers (pomodoro, countdown, stopwatch) and date calculators.',
			url: 'https://www.timerone.com',
		},
	];
</script>

<article class="alpha">
	<h1>
		<span>Hi, I'm</span>
		<span class="name f-serif">Dmytro</span>
		<span>a web developer</span>
	</h1>

	<section class="btns">
		<a href="https://github.com/diogenesofweb" class="btn filled">GitHub</a>
		<a href="https://dev.to/diogenesofweb" class="btn filled">Dev.to</a>
	</section>

	<section class="projects">
		<h2 class="hh">Projects</h2>
		<nav class="ext">
			{#each my_projects as el}
				<a href={el.url}>
					<b>{el.name}</b>
					<span>{el.title}</span>
				</a>
			{/each}
		</nav>
	</section>
</article>

<svelte:head>
	<title>DelphicTop | Home</title>
	<meta
		name="description"
		content="Personal website with focus on webdev and coding in general"
	/>
</svelte:head>

<style>
	article {
		max-width: 80ch;
		margin-inline: auto;
		padding-block: 5ch;
		color: var(--fg1);
	}
	h1 {
		display: grid;
		font-size: clamp(1rem, 5vw, 3.5rem);
	}

	.name {
		font-size: clamp(2rem, 10vw, 4.5rem);
		font-weight: bold;
		color: var(--__fg);
	}

	.btns {
		display: flex;
		gap: 1em;
	}

	.projects {
		margin-top: 4em;
	}
	nav {
		display: grid;
		gap: 1em;
	}
	.ext a {
		display: grid;
		gap: 0.25em;
		text-decoration: none;
		color: var(--fg1);

		& > b {
			color: var(--__fg);
		}

		&:is(:hover, :focus-visible) {
			color: var(--__fg);
		}
	}
</style>
