<script>
	import { page } from '$app/stores'
	import ThemeSwitch from '$lib/themeSwitch.svelte'
</script>

<header>
	<nav class="maxy font2">
		<ul>
			<!-- <li class:active={$page.path === '/'}><a href="/">Home</a></li> -->
			<!-- <li class:active={$page.path === '/'}><a href="/">DelphicTop</a></li> -->
			<li class:active={$page.path === '/'}><a href="/">DT</a></li>
			<!-- <li class:active={$page.path === '/blogs'}><a href="/blogs">Blogs</a></li> -->
			<li class:active={$page.path === '/about'}><a href="/about">About</a></li>
		</ul>

		<ThemeSwitch />
	</nav>
</header>

<style>
	header {
		background-color: var(--bg);
		box-shadow: 0 0 0.6rem -0.2rem var(--text-accent);
		transition: box-shadow 300ms ease-in;
	}

	header:hover {
		box-shadow: 0 0 0.6rem -0.2rem var(--text-hover);
	}

	nav {
		padding: 0.5rem var(--space-x);
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: center;
	}

	ul {
		/* background-color: #2f2fb6; */
		list-style: none;

		display: flex;
		gap: 1rem;
		align-items: baseline;
		justify-content: flex-end;
	}

	li:first-child {
		color: var(--text-accent);
		font-size: 1.33rem;
		margin-right: auto;
	}

	a,
	a:visited {
		color: currentColor;
		text-decoration: none;
		font-weight: bold;
		transition: color 300ms ease-in;
	}

	a:hover {
		color: var(--text-hover);
	}
</style>
