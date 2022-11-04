<script>
	/** @type {string[]} */
	export let tags;
	export let active = '';
</script>

<ul class="danger">
	{#each tags as tag}
		<li class="alpha">
			<a
				href="/?tag={tag}"
				class="btn outlined round gamma"
				class:active={active == tag}
			>
				<span>#{tag}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
		padding: 0;
		list-style: none;

		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		/* align-self: center; */
		justify-content: center;
		--xx: var(--__bg-1);
	}
	li {
		--xx2: var(--__bg-1);
	}
	a:not(:hover) {
		text-decoration: none;
	}

	:global(html.dark) a.btn {
		background: linear-gradient(to right bottom, var(--__bg-1), var(--xx));
		background: linear-gradient(to right bottom, var(--xx2), var(--xx));
	}
</style>
