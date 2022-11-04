<!-- </script> -->
<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BlogList from '$lib/BlogList.svelte';
	import TagList from '$lib/TagList.svelte';
	import { onDestroy } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	// console.log({ data });
	const tagSet = new Set();
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
	<title>DelphicTop | Index</title>
	<meta name="description" content="Webdev and related topics notes" />
</svelte:head>

<section class="font2 top maxx mx">
	<h1>
		My notes on
		<span>web development</span>
		and related topics.
	</h1>
</section>

<section class="tags maxx">
	<!-- <h2 class="">Tags:</h2> -->

	<TagList {tags} active={tag} />
</section>

<section class=" maxx mx">
	<!-- <h2>Articles:</h2> -->

	<BlogList posts={blogsFilteredByTag} />
</section>

<style>
	section.top {
		margin-block: 15vh;
		padding: 0 var(--sx-m);
	}

	section.tags {
		margin-block: 15vh;
	}

	section.maxx {
		max-width: var(--content-max-width);
	}

	h1 {
		text-align: center;
	}

	h1 > span {
		display: inline-block;
		padding: 0.3rem 0.6rem;

		background-color: var(--bg2);
		color: var(--fg-danger);

		transform: rotate(-3deg);
	}
</style>
