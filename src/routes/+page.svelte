<script>
</script>

<article>
	<div>Hi, I'm</div>
	<div class="name f-serif">Dmytro</div>
	<div>a web developer</div>
</article>

<svelte:head>
	<title>DelphicTop | Home</title>
	<meta name="description" content="Personal website with focus on webdev" />
</svelte:head>

<style>
	article {
		max-width: 80ch;
		margin-inline: auto;
		padding-block: 5ch;
		color: var(--fg1);
	}
	div {
		font-size: clamp(1rem, 5vw, 3.5rem);
	}

	.name {
		font-size: clamp(2rem, 10vw, 4.5rem);
		font-weight: bold;
	}
</style>
