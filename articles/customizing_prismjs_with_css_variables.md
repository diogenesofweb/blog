---
title: Customizing PrismJS with CSS variables
description: Customizing Prism.js syntax highlighter with CSS variables for light and dark color theme
created: 2021-06-06
tags:
  - 'CSS'
  - 'Prism'
  - 'Markdown'
---

For this blog I use [markdown-it](https://github.com/markdown-it/markdown-it) for parsing `.md` and [Prism](https://prismjs.com/) for syntax highlighting.

Prism comes with themes available to use right away. But I wanted to style all myself using only three colors with different shades.

Following is the result of my customising.

First thing first. CSS variables:

```css
/* light theme */
:root {
	--text: hsl(0, 0%, 16%);
	--bg: hsl(0, 0%, 100%);

	--h-text-color: 0, 0%;
	--h-base-color: 276, 16%;
	--h-accent-color: 213, 36%;

	--h-string-attr-name: hsl(var(--h-text-color), 30%);
	--h-punctuation: hsl(var(--h-text-color), 40%);
	--h-comment: hsl(var(--h-text-color), 50%);

	--h-function-attr-value: hsl(var(--h-base-color), 41%);

	--h-regex-important: hsl(var(--h-accent-color), 61%);
	--h-keyword-property: hsl(var(--h-accent-color), 48%);
	--h-tag: hsl(var(--h-accent-color), 36%);
	--h-atrule: hsl(var(--h-accent-color), 26%);

	--h-select: hsl(0, 0%, 88%);
	--h-bg: var(--bg);
}

/* dark theme */
html.dark {
	--text: hsl(0, 0%, 94%);
	--bg: hsl(247, 12%, 15%);

	--h-text-color: 0, 0%;
	--h-base-color: 60, 100%;
	--h-accent-color: 200, 100%;

	--h-string-attr-name: hsl(var(--h-text-color), 75%);
	--h-punctuation: hsl(var(--h-text-color), 45%);
	--h-comment: hsl(var(--h-text-color), 55%);

	--h-function-attr-value: hsl(var(--h-base-color), 82%);
	--h-atrule: hsl(var(--h-base-color), 66%);
	--h-regex-important: hsl(var(--h-base-color), 40%);

	--h-keyword-property: hsl(var(--h-accent-color), 75%);
	--h-tag: hsl(var(--h-accent-color), 46%);

	--h-select: hsl(200, 100%, 5%);
	--h-bg: var(--bg);
}
```

Styling tokens:

```css
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: var(--h-comment);
}

.token.punctuation {
	color: var(--h-punctuation);
}

.token.tag,
.token.boolean,
.token.number,
.token.selector,
.token.deleted {
	color: var(--h-tag);
}

.token.keyword,
.token.property,
.token.constant,
.token.symbol,
.token.builtin {
	color: var(--h-keyword-property);
}

.token.attr-name,
.token.string,
.token.char,
.token.operator,
.token.entity,
.token.url,
.token.parameter,
.language-css .token.string,
.style .token.string,
.token.variable,
.token.inserted {
	color: var(--h-string-attr-name);
}

.token.function,
.token.attr-value {
	color: var(--h-function-attr-value);
}

.token.atrule {
	color: var(--h-atrule);
}

.token.regex,
.token.important {
	color: var(--h-regex-important);
}

.token.important,
.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}
```

And the rest:

```css
code,
pre[class*='language-'] {
	color: var(--text);
	background: var(--h-bg);

	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;

	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	tab-size: 2;
	hyphens: none;
}

/* Code blocks */
pre[class*='language-'] {
	overflow: auto;

	border: 1px solid gray;
	border-radius: 0.5rem;

	margin: 1.5rem 0;
	padding: 1.5rem clamp(1rem, 5%, 2.5rem);
}

pre[class*='language-']::selection,
pre[class*='language-'] ::selection,
code[class*='language-']::selection,
code[class*='language-'] ::selection {
	text-shadow: none;
	background: var(--h-select);
}
/* Inline code */
:not(pre) > code {
	padding: 0.15em 0.2em 0.05em;
	white-space: normal;
	background: var(--bg);
}
```
