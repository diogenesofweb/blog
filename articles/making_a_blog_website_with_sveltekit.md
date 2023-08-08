---
title: Making a blog website with SvelteKit
description: How to build a simple blog website with SvelteKit, statically generated (SSG) from markdown
created: 2021-06-10
updated: 2023-08-05
tags:
  - 'SvelteKit'
  - 'Svelte'
  - 'SSG'
  - 'Markdown'
---

List of projects used.

[SvelteKit](https://kit.svelte.dev)\
[gray-matter](https://github.com/jonschlinkert/gray-matter) - parse front-matter\
[markdown-it](https://github.com/markdown-it/markdown-it) - parse markdown\
[markdown-it-prism](https://github.com/jGleitz/markdown-it-prism) > [Prism](https://prismjs.com/) - syntax highlighting

---

Changes to directory structure after initializing SvelteKit project.

```bash
articles
└─ sveltekit_is_amazing.md

src
└─ routes
	 └─ +layout.svelte
	 └─ +page.server.js
	 └─ index.svelte
	 └─ blog
     ├─ [slug].svelte
     └─ [slug].json.js
```

Create **articles** folder in your **root** directory. It is home for all future blog posts. Then create the first article, **"SvelteKit is amazing"**.

```bash
mkdir articles
cd articles
touch sveltekit_is_amazing.md
```

Add front-matter and content to the article.

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

**File name** should match **article title** ( transformed to lowercase, and empty strings replaced with \_ ).

---

### Get

Two [server endpoints](https://kit.svelte.dev/docs/load#universal-vs-server) are to be made.\
One for a blog page `~/routes/blog/[slug]/+page.server.js`.\
And one for an index page `~/routes/+page.server.js` (getting blogs metadata).

So, inside the `load` function for fetching a blog, following steps are performed.

1. Load corresponding `.md` file as string.
2. Process separately front-matter and content.
3. Parse front-matter with 'gray-matter’ as JSON object.
4. Parse file content with 'markdown-it' returning HTML as string.
5. Return processed data.

```js
/* ~/src/routes/blog/[slug]/+page.server.js */
import fs from 'fs';
import mi from 'markdown-it';
import prism from 'markdown-it-prism';
import 'prism-svelte';
import matter from 'gray-matter';

const md = mi({
	html: true,
	linkify: true,
	typographer: true,
});

// Remember old renderer, if overridden, or proxy to default renderer
const defaultRender =
	md.renderer.rules.link_open ||
	function (tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};

md.use(prism, {});
/** @typedef {import("../../../typings/types").BlogMetadata} DM*/

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { slug } = params;

	const doc = await fs.promises.readFile(`articles/${slug}.md`, 'utf8');
	// console.log(doc)

	const { data, content } = matter(doc);
	/** @type {DM} */
	const metadata = data;
	metadata.tags = metadata.tags.map((t) => t.toLowerCase());

	/* 3. Process content {String}*/
	const html = md.render(content);

	return {
		blog: { html, metadata },
	};
}
```

As all blog posts are placed in **articles** folder, and only there, and only in **.md** format, the `load` function for fetching blogs metadata is much simpler. Steps:

1. Get file names of all blog posts.
2. Load each file and parse front-matter.
3. Sort by creation date.
4. Return blogs as array.

```js
/* ~/src/routes/+page.server.js */
import fs from 'fs';
import matter from 'gray-matter';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const fileNames = await fs.promises.readdir('articles');

	const blogs = await Promise.all(
		fileNames.map(async (fileName) => {
			const doc = await fs.promises.readFile(`articles/${fileName}`, 'utf8');
			const { data } = matter(doc);
			/** @type {import('../../typings/types').BlogMetadata } */
			const md = data;
			return md;
		})
	);
	blogs.sort((a, b) => b.created.getTime() - a.created.getTime());

	return { blogs };
}
```

---

### Markup

```html
<!-- +layout.svelte -->

<a href="/">Index</a>
<main>
	<slot />
</main>
```

As the [load](https://kit.svelte.dev/docs#loading-input) function fetches corresponding endpoints, the index page receives all posts from it.

Then all tags are listed and blogs are filtered by route param (?tag=) if there is one.

```html
<!-- index.svelte -->

<script>
	import { browser } from '$app/env';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageServerData} */
	export let data;
	const blogs = data.blogs;

	const tagSet = new Set();
	blogs.forEach((blog) => {
		blog.tags.forEach((tag) => tagSet.add(tag));
	});
	const tags = [...tagSet].sort();

	let tag;

	$: blogsFilteredByTag = tagSet.has(tag)
		? blogs.filter((p) => p.tags.includes(tag))
		: blogs;

	let unsub;

	if (browser) {
		unsub = page.subscribe(({ url }) => {
			tag = url.searchParams.get('tag');
			// console.log({ tag })
		});
	}

	onDestroy(() => {
		unsub && unsub();
	});
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

Just fetching and displaying a blog.

```html
<script>
	export let blog;
	const blog = data.blog;
</script>

<svelte:head>
	<title>{blog.metadata.title}</title>
	<meta name="description" content="{blog.metadata.description}" />
</svelte:head>

<article>
	<h1>{blog.metadata.title}</h1>
	<p>
		<i>Created:</i>
		<time>{new Date(blog.metadata.created).toLocaleDateString()}</time>
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
	title: string;
	description: string;
	created: Date;
	tags: string[];
}
```

---

### Build

Install [@sveltejs/adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) and update **svelte.config.js** as instructed. Then `npm run build`.

All pages will be [prerendered](https://kit.svelte.dev/docs#ssr-and-javascript-prerender).\
Only the index page will load JS, make [hydration](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate), turning the website into SPA.\
Every blog page will go with 0 JS, so traditional navigation and no hydration.
