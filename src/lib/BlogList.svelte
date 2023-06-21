<script>
	/** @type {import('../typings/types').BlogMetadata[]} */
	export let posts;
</script>

<ol class="alpha">
	{#each posts as post}
		<li class="card">
			<h2 class="f-serif">
				<a href="/blog/{post.title.replaceAll(' ', '_').toLowerCase()}">
					{post.title}
				</a>
			</h2>

			<p>{post.description}</p>

			<div class="tags">
				{#each post.tags as tag}
					<a href="/?tag={tag}">
						<span>#{tag}</span>
					</a>
				{/each}
			</div>
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 2em;
	}
</style>
