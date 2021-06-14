<script context="module">
	// import '../../css/code-dark.css'
	// import '../../css/code-light.css'
	import '../../css/prism.css'

	import { browser, dev } from '$app/env'

	export const hydrate = dev
	export const router = browser

	export async function load({ page, fetch }) {
		const url = `/blog/${page.params.slug}.json`
		const res = await fetch(url)

		if (res.ok) {
			const blog = await res.json()
			// console.log({ post })
			return { props: { blog } }
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		}
	}
</script>

<script>
	import TagList from '$lib/tagList.svelte'
	/**
	 * @typedef {import('../../typings/types').BlogMetadata} BlogMetadata
	 */
	/**
	 * @type {{ metadata: BlogMetadata, html: String}}
	 */

	export let blog
</script>

<svelte:head>
	<title>{blog.metadata.title}</title>
	<meta name="description" content={blog.metadata.description} />
</svelte:head>

<div class="max-content">
	<article>
		<h1 class="font2">{blog.metadata.title}</h1>

		<p class="created">
			<i>Created:</i> <time>{new Date(blog.metadata.created).toLocaleDateString()}</time>
		</p>

		<hr />
		{@html blog.html}
	</article>

	<section class="tags">
		<TagList tags={blog.metadata.tags} />
	</section>
</div>

<style>
	article {
		padding: 3rem 0;
	}

	article > :global(hr) {
		margin: 3rem 0;
		border: none;
		width: 100%;
		height: 1px;
		background-color: var(--line);
	}

	/* article > :global(:is(h1, h2, h3, h4, p)) { */
	article > :global(*) {
		max-width: var(--content-max-width);
		margin-left: auto;
		margin-right: auto;
	}

	article > :global(p a) {
		color: var(--text-accent);
	}

	/* article > :global(p a:visited), */
	article > :global(p a:hover) {
		color: var(--text-hover);
	}

	/* article :global(a[target='_blank']) {
		font-style: italic;
	} */

	article :global(blockquote) {
		border-left: 3px solid var(--line);
		padding: 1px 1rem;
		background-color: var(--bg-darker);
	}

	article :global(iframe) {
		width: 100%;
		height: min(100vh, 600px);
	}

	p.created {
		opacity: 0.75;
	}
</style>
