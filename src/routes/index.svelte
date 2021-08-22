<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch }) {
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

  import BlogList from '$lib/BlogList.svelte'
  import TagList from '$lib/TagList.svelte'

  /** @type {import('../typings/types').BlogMetadata[]} */
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
  <title>DelphicTop | Index</title>
  <meta name="description" content="Webdev and related topics notes" />
</svelte:head>

<section class="font2 max-content top maxx mx">
  <h1>
    My notes on
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
    margin-block: 15vh;
    padding: 0 var(--rsx);
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

    background-color: var(--bg-darker);
    color: var(--text-hover);

    transform: rotate(-3deg);
  }
</style>
