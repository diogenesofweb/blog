<script>
	export let posts
</script>

<ol>
	{#each posts as post}
		<li>
			<h2 class="font2">
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
	}

	li {
		padding: 0.5rem var(--space-x) 0;
		box-shadow: 0 0 1rem -0.4rem var(--text-accent);
		border-radius: 0.75rem;

		transition: box-shadow 300ms ease-in;
	}

	li:hover {
		box-shadow: 0 0 1.5rem -0.4rem var(--text-hover);
	}

	li ~ li {
		margin-top: 3.5rem;
	}

	a {
		color: var(--text-accent);
		text-decoration: none;
	}

	a:hover {
		color: var(--text-hover);
	}

	.tags {
		border-top: 1px solid var(--line);
		padding: 1rem 0 1.5rem;
	}
</style>
