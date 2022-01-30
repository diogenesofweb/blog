<script context="module">
  import '../../css/prism.css'

  import { browser, dev } from '$app/env'

  export const hydrate = dev
  export const router = browser

  export async function load({ params, fetch }) {
    const url = `/blog/${params.slug}.json`
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
  import TagList from '$lib/TagList.svelte'
  /**
   * @typedef {import('../../typings/types').BlogMetadata} BlogMetadata
   */
  /**
   * @type {{ metadata: BlogMetadata, html: String}}
   */

  export let blog

  const titleURL = blog.metadata.title.replaceAll(' ', '_').toLowerCase()
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
  <meta property="og:image" content="https://www.delphic.top/og-images/{titleURL}.png" />
</svelte:head>

<!-- <img src="/og-images/{titleURL}.png" /> -->

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

    /* background-color: rgba(137, 43, 226, 0.418); */
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
  article > :global(:is(iframe, hr)) {
    max-width: 100%;
  }

  article :global(iframe) {
    width: 100%;
    max-height: 100vh;
    border: 1px solid var(--line);
  }

  article :global(img) {
    max-width: 100%;
    height: auto;
  }

  article :global(a) {
    color: var(--text-accent);
  }

  /* article > :global(p a:visited), */
  article :global(a:hover) {
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

  p.created {
    opacity: 0.75;
  }
</style>
