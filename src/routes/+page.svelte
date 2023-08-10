<script>
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
</style>
