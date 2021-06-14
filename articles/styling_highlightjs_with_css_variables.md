---
title: Styling HighlightJS with CSS variables
description: Customize Highlight.js syntax highlight with CSS variables  for light / dark color theme
created: 2021-06-01
tags:
  - 'CSS'
  - 'Highlightjs'
  - 'Markdown'
---

This website uses [Markdown-it](https://github.com/markdown-it/markdown-it) and suggested way to do syntax highlighting is to use [Highlight.js](https://highlightjs.org/). So, I did as written in the repo. Highlight.js comes with [a lot of themes](https://github.com/highlightjs/highlight.js/tree/main/src/styles), and colors in example below are taken from the one corresponding to stackoverfow’s color palette.

`:root` selector is responsible for **CSS custom properties aka variables** for light (default) theme, and `html.dark` for dark theme.

First, let's define some variables, in _~/vars.css_ or _~/highlight.css_

```css
/* light (default) theme */
:root {
	--highlight-bg: #f6f6f6;
	--highlight-color: #2f3337;
	--highlight-comment: #656e77;
	--highlight-keyword: #015692;
	--highlight-attribute: #015692;
	--highlight-symbol: #803378;
	--highlight-namespace: #b75501;
	--highlight-variable: #54790d;
	--highlight-literal: #b75501;
	--highlight-punctuation: #535a60;
	--highlight-deletion: #c02d2e;
	--highlight-addition: #8dad98;
}
/* dark theme */
html.dark {
	--highlight-bg: #1c1b1b;
	--highlight-color: #ffffff;
	--highlight-comment: #999999;
	--highlight-keyword: #88aece;
	--highlight-attribute: #88aece;
	--highlight-symbol: #c59bc1;
	--highlight-namespace: #f08d49;
	--highlight-variable: #b5bd68;
	--highlight-literal: #f08d49;
	--highlight-punctuation: #cccccc;
	--highlight-deletion: #de7176;
	--highlight-addition: #76c490;
}
```

Then in _~/highlight.css_

```css
.hljs {
	color: var(--highlight-color);
	background: var(--highlight-bg);
}

.hljs-subst {
	color: var(--highlight-color);
}

.hljs-comment {
	color: var(--highlight-comment);
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-meta .hljs-keyword,
.hljs-doctag,
.hljs-section {
	color: var(--highlight-keyword);
}

.hljs-attr {
	color: var(--highlight-attribute);
}

.hljs-attribute {
	color: var(--highlight-symbol);
}

.hljs-name,
.hljs-type,
.hljs-number,
.hljs-selector-id,
.hljs-quote,
.hljs-template-tag {
	color: var(--highlight-namespace);
}

.hljs-selector-class {
	color: var(--highlight-keyword);
}

.hljs-string,
.hljs-regexp,
.hljs-symbol,
.hljs-variable,
.hljs-template-variable,
.hljs-link,
.hljs-selector-attr {
	color: var(--highlight-variable);
}

.hljs-meta,
.hljs-selector-pseudo {
	color: var(--highlight-keyword);
}

.hljs-built_in,
.hljs-title,
.hljs-literal {
	color: var(--highlight-literal);
}

.hljs-bullet,
.hljs-code {
	color: var(--highlight-punctuation);
}

.hljs-meta .hljs-string {
	color: var(--highlight-variable);
}

.hljs-deletion {
	color: var(--highlight-deletion);
}

.hljs-addition {
	color: var(--highlight-addition);
}

.hljs-emphasis {
	font-style: italic;
}

.hljs-strong {
	font-weight: bold;
}
```

Also, to make it all a little bit nicer

```css
pre {
	margin: 1.5rem 0;
	padding: 1.5rem clamp(1rem, 5%, 2.5rem);
	tab-size: 2;
	overflow-x: auto;
}
```

And sync colors with `<code>` tags in article paragraphs (but not inside `<pre>`)

```css
article > p code {
	color: var(--highlight-keyword);
	background-color: var(--highlight-bg);
	padding: 0.2rem 0.4rem;
}
```

Maybe I did something wrong, but unfortunately parsing CSS snippets just dont work properly. Especially custom properties. So, I googled “highlight.js alternative”. And now this website uses [Prism](https://prismjs.com/).
