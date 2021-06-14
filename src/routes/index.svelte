<script context="module">
	// import { browser, dev } from '$app/env'
	// export const hydrate = dev
	// export const router = browser

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		// const url = `/blog/${page.params.slug}.json`;
		const url = `/blogs.json`
		const res = await fetch(url)

		if (res.ok) {
			const blogs = await res.json()
			// console.log({ blogs })
			return {
				props: { blogs }
			}
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		}
	}
</script>

<script>
	import { page } from '$app/stores'

	import BlogList from '$lib/blogList.svelte'
	import TagList from '$lib/tagList.svelte'

	/**
	 * @type {import('../typings/types').BlogMetadata[]}
	 */
	export let blogs
	// console.log(JSON.stringify(blogs[0]))
	const tagSet = new Set()

	blogs.forEach((blog) => {
		blog.tags.forEach((tag) => tagSet.add(tag))
	})

	const tags = [...tagSet].sort()

	export let tag

	page.subscribe(({ query }) => {
		tag = query.get('tag')
		// console.log({ tag })
	})

	$: blogsFilteredByTag = tagSet.has(tag) ? blogs.filter((p) => p.tags.includes(tag)) : blogs
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="font2 max-content top maxx mx">
	<h1>
		My notes in the form of a blog on
		<span>web development</span>
		and related topics.
	</h1>
</section>

<section class="tags max-content">
	<!-- <h2 class="">Tags:</h2> -->

	<TagList {tags} active={tag} />
</section>

<section class="max-content maxx mx">
	<!-- <h2>Articles:</h2> -->

	<BlogList posts={blogsFilteredByTag} />
</section>

<style>
	section.top {
		margin-top: 15vh;
		margin-bottom: 15vh;
		padding: 0 var(--rsx);
	}

	section.tags {
		margin-top: 15vh;
		margin-bottom: 15vh;
	}

	section.maxx {
		max-width: var(--content-max-width);
	}

	h1 {
		text-align: center;
	}

	h1 > span {
		display: inline-block;

		background-color: var(--bg-darker);
		color: var(--text-accent);
		color: var(--text-hover);

		padding: 0.3rem 0.6rem;

		transform: rotate(2deg);
	}

	/* h1 > span {
		display: inline-block;

		background-color: var(--bg-darker);
		color: var(--text-hover);
		background: linear-gradient(to bottom, var(--text-hover), var(--text-accent));
		background-clip: text;
		-webkit-text-fill-color: transparent;
	} */
</style>
