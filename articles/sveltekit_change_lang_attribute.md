---
title: SvelteKit change lang attribute
description: SvelteKit, change <html> lang attribute inside hooks on build
created: 2021-06-08
updated: 2023-08-05
tags:
  - 'SvelteKit'
  - 'SSG'
---

<iframe src="https://demo-sveltekit-lang-attr.pages.dev/"
        title="Demo: SvelteKit change lang attribute" 
        width="300" height="400">
</iframe>

[Demo](https://demo-sveltekit-lang-attr.pages.dev/) & [Repo](https://github.com/diogenesofweb/demo-sveltekit-lang-attr)

---

I wondered, if I'm asked to build a showcase website with internationalisation, what tech should I choose? Since I really like component base flow, like in Svelte and Vue, especially scoped styling, I was curious to see if it will be a hassle to do with SvelteKit, a project I'm quite interested in.

[SvelteKit](https://kit.svelte.dev) doesn't have, at least in time of writing, the option to change the lang attribute of `<html>` depending on route path. But it's easily doable with [hooks](https://kit.svelte.dev/docs#hooks).

For this example, [@sveltejs/adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) is used to prerender the entire website, a kind of SSG.

---

Let’s begin by creating a SvelteKit project and installing the above-mentioned adapter (don’t forget to follow instructions on how to use it).

```shell
npm init svelte@next demo
cd demo
npm i
npm i -D @sveltejs/adapter-static@next
```

We have our english version at `/`, then french at `/fr`, and ukrainian at `/ua`

Routes folder looks like this.

```shell
routes
 └─ ua
     └─ index.svelte
 └─ fr
     └─ index.svelte
 └─ index.svelte
 └─+layouts.svelte

```

Now markup.

```html
<!-- ~/routes/+layouts.svelte -->

<main>
	<nav class="ce">
		<a href="/">🇬🇧</a>
		<a href="/fr">🇫🇷</a>
		<a href="/ua">🇺🇦</a>
	</nav>

	<section>
		<slot />
	</section>
</main>
```

The `+layout.js` file in route directory should include.

```js
export const csr = false;
export const prerender = true;
```

A little bit of **HTML** for each route.

```html
<!-- ~/routes/index.svelte -->
<svelte:head>
	<title>Hello</title>
</svelte:head>

<h1>Hello World</h1>
```

```html
<!-- ~/routes/fr/index.svelte -->
<svelte:head>
	<title>Bonjour</title>
</svelte:head>

<h1>Bonjour le Monde</h1>
```

```html
<!-- ~/routes/ua/index.svelte -->
<svelte:head>
	<title>Привіт</title>
</svelte:head>

<h1>Привіт Світе</h1>
```

And finally `hooks.js`.

```js
/* ~/src/hooks.js */

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	const response = await resolve(request);

	if (request.path.startsWith('/fr')) {
		return {
			...response,
			// @ts-ignore
			body: response.body?.replace('<html lang="en">', '<html lang="fr">'),
		};
	}

	if (request.path.startsWith('/ua')) {
		return {
			...response,
			// @ts-ignore
			body: response.body?.replace('<html lang="en">', '<html lang="uk">'),
		};
	}

	return response;
}
```

To build and then preview on `localhost:5173`.

```shell
npm run build
npm run preview
```

The site is not in SPA mode, so on every navigation page will reload.

How to do it in SPA mode and change lang on the fly?
I suppose we can just watch the `path` property in the [page](https://kit.svelte.dev/docs#loading-input-page) object inside **+layout.svelte** and then update `<html>` accordingly.
