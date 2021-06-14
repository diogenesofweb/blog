---
title: Making a blog website with SvelteKit
description: Making a blog website with SvelteKit, statically generated from markdown
created: 2021-06-10
tags:
  - 'SvelteKit'
  - 'SSG'
  - 'Markdown'
---

Projects used:

[SvelteKit](https://kit.svelte.dev)\
[gray-matter](https://github.com/jonschlinkert/gray-matter) - parse front-matter\
[markdown-it](https://github.com/markdown-it/markdown-it) - parse markdown\
[markdown-it-prism](https://github.com/jGleitz/markdown-it-prism) > [Prism](https://prismjs.com/) - syntax highlighting

---

Changes to directory structure after initializing SvelteKit project.

```text
articles
└─ sveltekit_is_amazing.md

src
└─ routes
	 └─ blog
			├─ [slug].svelte
			└─ [slug].json.js
	 └─ index.svelte
	 └─ blogs.json.js
	 └─ __layout.svelte
```

`~/articles/sveltekit_is_amazing.md` :

```md
---
title: SvelteKit is amazing
description: SvelteKit is absolutely amazing.
created: 2021-06-10
tags:
  - 'SvelteKit'
  - 'Markdown'
---

Why SvelteKit is absolutely amazing?
...
```

File name should match article title ( transformed to lowercase, and empty strings replaced with \_ ).

---

### Endpoints

Two [endpoints](https://kit.svelte.dev/docs#routing-endpoints) are to be made.\
One for a blog page `[slug].json.js`.\
And one for index page `blogs.json.js` (getting blogs metadata).

Following docs, endpoint files have to export the `get` function for **GET** requests.

Then, inside `get` function for fetching a blog:

1. Load corresponding `.md` file as string
2. Process separately front-matter and content
3. Parse front-matter with 'gray-matter’ as JSON object
4. Parse file content with 'markdown-it' returning HTML as string
5. Return processed data

```js
/* ~/src/routes/blog/[slug].json.js */

import fs from 'fs'
import mi from 'markdown-it'
import prism from 'markdown-it-prism'
import matter from 'gray-matter'

// Init markdown-it
const md = mi({
	html: true,
	linkify: true,
	typographer: true
})

// Remember old renderer, if overridden, or proxy to default renderer
const defaultRender =
	md.renderer.rules.link_open ||
	function (tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options)
	}

// Make external (http(s)://) links open in a new window
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	const href = tokens[idx].attrs[tokens[idx].attrIndex('href')][1]
	// console.log(href)
	if (href.startsWith('http')) {
		tokens[idx].attrPush(['rel', 'noopener noreferrer'])
		tokens[idx].attrPush(['target', '_blank'])
		// tokens[idx].attrPush(['class', 'external-link'])
	}
	// pass token to default renderer.
	return defaultRender(tokens, idx, options, env, self)
}

// Use Prism for syntax highlighting
md.use(prism)

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { slug } = params
	const doc = await fs.promises.readFile(`articles/${slug}.md`, 'utf8')
	// console.log(doc)
	const { data: metadata, content } = matter(doc)
	// console.log(metadata)
	// console.log(content)
	const html = md.render(content)

	return {
		body: JSON.stringify({ metadata, html })
	}
}
```

As all blog posts are placed in **articles** folder, and only there, and only in **.md** format, the `get` function for fetching blogs metadata is much simpler. Steps:

1. Get file names of all blog posts
2. Load each file and parse front-matter
3. Sort by creation date
4. Return blogs as array

```js
/* ~/src/routes/blogs.json.js */

import fs from 'fs'
import matter from 'gray-matter'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const fileNames = await fs.promises.readdir('articles')
	// If there are not only .md files: fileNames.filter((fileName) => /.+\.md$/.test(fileName))
	const blogs = await Promise.all(
		fileNames.map(async (fileName) => {
			const doc = await fs.promises.readFile(`articles/${fileName}`, 'utf8')
			const { data } = matter(doc)
			// console.log({ data })
			return data
		})
	)
	blogs.sort((a, b) => b.created - a.created)
	// console.log({ blogs })
	return {
		body: JSON.stringify(blogs)
	}
}
```

---

### Markup

```markup
<!-- __layout.svelte -->

<a href="/">Index</a>
<main>
	<slot />
</main>
```

Defining [load](https://kit.svelte.dev/docs#loading-input) function to fetch corresponding endpoints.\
Then list all tags and filter blogs by route param (?tag=) if there is one.

```markup
<!-- index.svelte -->

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
	{#each blogsFilteredByTag as blog}
		<li>
			<a href="/blog/{blog.title.replaceAll(' ', '_').toLowerCase()}">
				{blog.title}
			</a>

			<p>{blog.description}</p>

			<div class="tags">
				{#each blog.tags as tag}
					<a href="/?tag={tag}"> #{tag} </a>
				{/each}
			</div>
		</li>
	{/each}
</ol>
```

Just fetching a blog

```markup
<!-- [slug].svelte -->

<script context="module">
	import { browser, dev } from '$app/env'
	export const hydrate = dev
	export const router = browser

	export async function load({ page, fetch }) {
		const url = `/blog/${page.params.slug}.json`
		const res = await fetch(url)
		if (res.ok) {
			const blog = await res.json()
			// console.log({ blog })
			return { props: { blog } }
		}
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		}
	}
</script>

<script>
	/** @typedef {import('../../typings/types').BlogMetadata} BlogMetadata */
	/** @type {{ metadata: BlogMetadata, html: String}} */
	export let blog
</script>

<svelte:head>
	<title>{blog.metadata.title}</title>
	<meta name="description" content={blog.metadata.description} />
</svelte:head>

<article>
	<h1>{blog.metadata.title}</h1>
	<p>
		<i>Created:</i> <time>{new Date(blog.metadata.created).toLocaleDateString()}</time>
	</p>
	{@html blog.html}
</article>

<ol>
	{#each blog.metadata.tags as tag}
		<li><a href="/?tag={tag}"> #{tag} </a></li>
	{/each}
</ol>
```

Types for vscode.

```ts
/* ~/typings/types.d.ts' */

export interface BlogMetadata {
	title: string
	description: string
	created: Date
	tags: string[]
}
```

---

### Build

Install [@sveltejs/adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) and update **svelte.config.js** as instructed. Then `npm run build`.

All pages will be [prerendered](https://kit.svelte.dev/docs#ssr-and-javascript-prerender).\
Only the index page will load JS, make [hydration](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate), turning the website into SPA.\
Every blog page will go with 0 JS, so no hydration and traditional navigation.

This website is actually built this way. Repo.
