<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BlogList from '$lib/BlogList.svelte';
	import TagList from '$lib/TagList.svelte';
	import { onDestroy } from 'svelte';

	/** @type {import('./$types').PageServerData} */
	export let data;
	// console.log({ data });
	const tagSet = new Set();
	/** @type {import('../../typings/types').BlogMetadata[] } */
	const blogs = data.blogs;

	blogs.forEach((blog) => {
		blog.tags.forEach((tag) => tagSet.add(tag));
	});

	const tags = [...tagSet].sort();

	let tag = '';

	$: blogsFilteredByTag = tagSet.has(tag)
		? blogs.filter((p) => p.tags.includes(tag))
		: blogs;

	/** @type {import("svelte/store").Unsubscriber} */
	let unsub;

	if (browser) {
		unsub = page.subscribe(({ url }) => {
			tag = url.searchParams.get('tag') || '';
			// console.log({ tag })
		});
	}

	onDestroy(() => {
		unsub && unsub();
	});
</script>

<svelte:head>
	<title>DelphicTop | Notes</title>
	<meta
		name="description"
		content="My notes on web development and related topics"
	/>
</svelte:head>

<div class="f-serif top maxx mx">
	<h1>
		My notes on
		<span>web development</span>
		and related topics.
	</h1>
</div>

<div class="main">
	<aside class="tags">
		<!-- <h2 class="">Tags:</h2> -->

		<ul class="danger">
			<TagList {tags} active={tag} />
		</ul>
	</aside>

	<div class="">
		<!-- <h2>Articles:</h2> -->
		<BlogList posts={blogsFilteredByTag} />
	</div>
</div>

<style>
	.maxx {
		margin-inline: auto;
		max-width: var(--content-max-width);
	}
	.top {
		margin-block: 15vh;
		padding: 0 var(--sx-m);
	}

	h1 {
		text-align: center;
	}

	h1 > span {
		display: inline-block;
		padding: 0.3rem 0.6rem;

		background-color: var(--bg);
		color: var(--fg-danger);

		transform: rotate(-3deg);
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;

		display: flex;
		gap: 1em;
		flex-wrap: wrap;
		/* align-self: center; */
		justify-content: center;
		margin-bottom: 6em;
	}
	@media only screen and (min-width: 800px) {
		.main {
			/* background: black; */
			display: grid;
			grid-template-columns: 200px 1fr;
			gap: 2em;

			max-width: 1000px;
			margin-inline: auto;
		}

		ul {
			padding-top: 1em;
			display: grid;
			/* background: gray; */
		}
	}

	@media only screen and (min-width: 1200px) {
		.main {
			/* background: black; */
			grid-template-columns: 200px 1fr 200px;
			max-width: 1200px;
		}
	}
</style>
