<script>
	import '../../../css/prism.css';
	import TagList from '$lib/TagList.svelte';

	export let data;
	const blog = data.blog;

	const titleURL = blog.metadata.title.replaceAll(' ', '_').toLowerCase();

	const options = {
		// year: 'numeric',
		// month: 'short',
		// day: 'numeric'
	};
</script>

<svelte:head>
	<title>{blog.metadata.title}</title>
	<link rel="canonical" href="https://www.delphic.top/blog/{titleURL}" />
	<meta name="description" content={blog.metadata.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- <meta name="twitter:site" content="@diogenesofweb" /> -->
	<meta name="twitter:creator" content="@diogenesofweb" />
	<meta property="og:url" content="https://www.delphic.top/blog/{titleURL}/" />
	<meta property="og:title" content={blog.metadata.title} />
	<meta property="og:description" content={blog.metadata.description} />
	<meta
		property="og:image"
		content="https://www.delphic.top/og-images/{titleURL}.png"
	/>
</svelte:head>

<!-- <img src="/og-images/{titleURL}.png" /> -->

<div class="maxx">
	<article>
		<h1 class="f-serif">{blog.metadata.title}</h1>

		<p class="created">
			<i>Created:</i>
			<time
				>{new Date(blog.metadata.created).toLocaleDateString(
					'en-GB',
					options
				)}</time
			>
			{#if blog.metadata.updated}
				<b>|</b>
				<i>Updated:</i>
				<time
					>{new Date(blog.metadata.updated).toLocaleDateString(
						'en-GB',
						options
					)}</time
				>
			{/if}
		</p>

		<hr />
		{@html blog.html}
	</article>

	<section class="tags">
		<ul class="fce g1">
			<TagList tags={blog.metadata.tags} />
		</ul>
	</section>
</div>

<style>
	article {
		padding: 3rem 0;

		/* background-color: rgba(137, 43, 226, 0.418); */
	}

	article > :global(hr) {
		margin: 3rem 0;
		border: none;
		width: 100%;
		height: 1px;
		background-color: var(--fl);
	}

	/* article > :global(:is(h1, h2, h3, h4, p)) { */
	article > :global(*) {
		max-width: var(--content-max-width);
		margin-left: auto;
		margin-right: auto;
	}
	article > :global(:is(iframe, hr)) {
		max-width: 100%;
	}

	article :global(iframe) {
		width: 100%;
		max-height: 100vh;
		border: 1px solid var(--fl);
	}

	article :global(img) {
		max-width: 100%;
		height: auto;
	}

	article :global(a) {
		color: var(--fg-alpha);
	}

	/* article > :global(p a:visited), */
	article :global(a:hover) {
		color: var(--fg-beta);
	}

	/* article :global(a[target='_blank']) {
		font-style: italic;
	} */

	article :global(blockquote) {
		border-left: 3px solid var(--fl);
		padding: 1px 1rem;
		background-color: var(--bg);
	}

	p.created {
		opacity: 0.75;
	}
</style>
