<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const url = `/blogs.json`
		const res = await fetch(url)

		if (res.ok) {
			const blogs = await res.json()
			// console.log({ blogs })
			return { props: { blogs } }
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		}
	}
</script>

<script>
	import { page } from '$app/stores'
	/** @type {import('../typings/types').BlogMetadata[]} */
	export let blogs
	const tagSet = new Set()
	blogs.forEach((blog) => {
		blog.tags.forEach((tag) => tagSet.add(tag))
	})
	const tags = [...tagSet].sort()
	let tag
	page.subscribe(({ query }) => {
		tag = query.get('tag')
	})
	$: blogsFilteredByTag = tagSet.has(tag) ? blogs.filter((p) => p.tags.includes(tag)) : blogs
</script>

<svelte:head>
	<title>Index</title>
</svelte:head>

<ol>
	{#each tags as tag}
		<li><a href="/?tag={tag}"> #{tag} </a></li>
	{/each}
</ol>

<ol>
	{#each blogsFilteredByTag as post}
		<li>
			<a href="/blog/{post.title.replaceAll(' ', '_').toLowerCase()}">
				{post.title}
			</a>

			<p>{post.description}</p>

			<div class="tags">
				{#each post.tags as tag}
					<a href="about2/?tag={tag}"> #{tag} </a>
				{/each}
			</div>
		</li>
	{/each}
</ol>
