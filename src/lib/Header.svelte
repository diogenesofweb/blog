<script>
	import { page } from '$app/stores';
	import { Dropdown, Icon } from '@kazkadien/svelte';
	import ThemeSelect from '@kazkadien/svelte/ThemeSelect.svelte';
</script>

<header>
	<nav class="maxy alpha">
		<ul>
			<li class:active={$page.url.pathname === '/'}>
				<a href="/">DelphicTop</a>
			</li>
			<li class:active={$page.url.pathname === '/projects'}>
				<a href="/projects">Projects</a>
			</li>
			<!-- <li class:active={$page.url.pathname === '/contact'}><a href="/contact">Contact</a></li> -->
			<!-- <li class:active={$page.path === '/about'}><a href="/about">About</a></li> -->
		</ul>

		<Dropdown variant="outlined" iconOnly align="right" overshadow>
			<Icon name="brightness_low" slot="dropbtn" />
			<ThemeSelect heading="" />
		</Dropdown>
	</nav>
</header>

<style>
	header {
		background-color: var(--bg1);
		box-shadow: 0 0 0.6rem -0.2rem var(--fg-alpha);
		transition: box-shadow 300ms ease-in;
	}

	header:hover {
		box-shadow: 0 0 0.6rem -0.2rem var(--fg-gamma);
	}

	nav {
		padding: 0.5rem var(--rsx);
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
		color: var(--fg-alpha);
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
		color: var(--fg-gamma);
	}
</style>
