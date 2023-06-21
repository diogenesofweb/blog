<script>
	/** @type {string[]} */
	export let tags;
	export let active = '';
</script>

{#each tags as tag}
	<li class="gamma">
		<a
			href="/blog/?tag={tag}"
			class="btn outlined round colore"
			class:active={active == tag}
		>
			<span>#{tag}</span>
		</a>
	</li>
{/each}

<style>
	.btn {
		--_bg: var(--bg3);
	}
	.active {
		color: var(--__fg2);
	}
</style>
