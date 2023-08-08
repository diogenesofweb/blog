---
title: Custom scrollbar CSS for all browsers
description: How to a create custom scrollbar with CSS for all modern browsers (Chrome, Edge, Safari)
created: 2022-08-08
tags:
  - 'CSS'
---

Unfortunately, we have to style scrollbars depending on browser support.

[CSS Scrollbars](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars) are supported by [Firefox](https://www.mozilla.org/en-US/firefox/) and [::-webkit-scrollbar](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar) by Chromium based ([Chrome](https://www.google.com/chrome/), [Edge](https://www.microsoft.com/en-us/edge)) and [Safari](https://www.apple.com/safari/).

Eventually all modern browsers will transition to CSS Scrollbars specification. In the meantime, we have to style both features to achieve the same look across all browsers. Thanks to the CSS goddess, it’s relatively easy to achieve. Picking the right colors and don't forgetting about the `border` property, which can be applied to `::-webkit-scrollbar-thumb`, is the hardest part.

Here is an example, leveraging [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*), with light/dark themes support.

```css
/* ~/scrollbar.css */

/* Default (light) theme */
:root {
	--page-background: white;

	--scrollbar-track: transparent;
	--scrollbar-thumb: lightsalmon;
	--scrollbar-thumb-hover: lightcoral;

	--scrollbar-width: 12px;
}
/* Default (light) theme */

/* Dark theme */
html.dark {
	--page-background: black;

	--scrollbar-thumb: salmon;
	--scrollbar-thumb-hover: chocolate;
}
/* Dark theme */

/* Firefox */
* {
	scrollbar-width: thick; /* none | auto  */
	scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}
/* Firefox */

/* Chrome, Edge, Safari */
*::-webkit-scrollbar {
	width: var(--scrollbar-width); /* vertical scrollbar */
	height: var(--scrollbar-width); /* horizontal scrollbar */
}

*::-webkit-scrollbar-track {
	background: var(--scrollbar-track);
}

*::-webkit-scrollbar-thumb {
	background: var(--scrollbar-thumb);
	border-radius: var(--scrollbar-width);
	border: calc(var(--scrollbar-width) / 4) solid var(--page-background);
}

*::-webkit-scrollbar-thumb:hover {
	background: var(--scrollbar-thumb-hover);
}
/* Chrome, Edge, Safari */
```
