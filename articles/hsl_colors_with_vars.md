---
title: HSL colors with vars
description: Defining color palette with CSS custom properties and HSL
created: 2021-02-03
tags:
  - 'CSS'
---

Let’s have two color themes, light and dark.

Let’s have 4 colors to play with:

1. **Danger** - red (deletes and kind)
2. **Alpha** - blue, brand / primary
3. **Beta** - viovet, secondary (on hover?)
4. **Gamma** - yellow or orange (for warnings)

Let’s have to style buttons: background color, border color, text color, on hover.

On white page background, two shades of color suffice for styling them.\
One for background color (classic btn), border & text (outlined btn).
Other for background color on hover.

But with a dark (dimmed) page, we have to distinguish between the button's background (dimmed shade) and text & border (bright shade).

So for the palette, 3 shades of color must be.

1. `--[color]` - for base
2. `--[color]-up` - for on hover
3. `--[color]-bright` - for text on dark mode

So, with custom properties:

1. `var(--alpha)`
2. `var(--alpha-up)`
3. `var(--alpha-bright)`

---

```css
/* COLORS */

:root {
	--lightness-base: var(--my-lightness-base, 40%);
	--lightness-up: var(--my-lightness-base-up, 49%); /* ex: for btn to light up a little on hover */
	--lightness-bright: var(--my-lightness-bright, 75%); /* ex: on dark mode */

	--hue-sat-danger: var(--my-hue-sat-danger, 0, 40%);
	--danger: hsl(var(--hue-sat-danger), var(--lightness-base));
	--danger-up: hsl(var(--hue-sat-danger), var(--lightness-up));
	--danger-bright: hsl(var(--hue-sat-danger), var(--lightness-bright));

	--hue-sat-alpha: var(--my-hue-sat-alpha, 220, 60%);
	--alpha: hsl(var(--hue-sat-alpha), var(--lightness-base));
	--alpha-up: hsl(var(--hue-sat-alpha), var(--lightness-up));
	--alpha-bright: hsl(var(--hue-sat-alpha), var(--lightness-bright));

	--hue-sat-beta: var(--my-hue-sat-beta, 280, 50%);
	--beta: hsl(var(--hue-sat-beta), var(--lightness-base));
	--beta-up: hsl(var(--hue-sat-beta), var(--lightness-up));
	--beta-bright: hsl(var(--hue-sat-beta), var(--lightness-bright));

	--hue-sat-gamma: var(--my-hue-sat-gamma, 16, 60%);
	--gamma: hsl(var(--hue-sat-gamma), var(--lightness-base));
	--gamma-up: hsl(var(--hue-sat-gamma), var(--lightness-up));
	--gamma-bright: hsl(var(--hue-sat-gamma), var(--lightness-bright));
}
```

```css
/* Adjust Colors */
:root {
	--my-hue-sat-danger: 0, 50%;
	--my-hue-sat-alpha: 210, 60%;
	--my-hue-sat-beta: 162, 40%;
	--my-hue-sat-gamma: 26, 60%;
}
```

```css
/* Adjust Brightness */

/* ex: lightness up */
:root {
	--my-lightness-base: 46%;
	--my-lightness-base-up: 52%;
	--my-lightness-bright: 80%;
}

/* ex: lightness down */
html.dark {
	--my-lightness-base: 32%;
	--my-lightness-base-up: 38%;
	--my-lightness-bright: 66%;
}
```

```css
:root {
	--hue-sat-bg: 215, 5%;
	--bg: hsl(var(--hue-sat-bg), 100%);
	--bg-darker: hsl(var(--hue-sat-bg), 95%);
	--bg-darkest: hsl(var(--hue-sat-bg), 90%);

	--text: hsl(0, 0%, 16%);
	--text-dim: hsl(0, 0%, 26%);
	--text-accent: var(--alpha);
	--text-hover: var(--beta);
}

html.dark {
	--hue-sat-bg: 215, 5%;
	--bg: hsl(var(--hue-sat-bg), 15%);
	--bg-darker: hsl(var(--hue-sat-bg), 13%);
	--bg-darkest: hsl(var(--hue-sat-bg), 11%);

	--text: hsl(0, 0%, 96%);
	--text-dim: hsl(0, 0%, 86%);
	--text-accent: var(--alpha-light);
	--text-hover: var(--beta-light);
}
```

```css
/* buttons */

/* brand / primary*/
.btn.alpha {
	background-color: var(--alpha);
}
.btn.alpha:hover {
	background-color: var(--alpha-up);
}

html.dark .btn.outlined.alpha {
	color: var(--alpha-bright);
	border-color: var(--alpha-bright);
}
```
