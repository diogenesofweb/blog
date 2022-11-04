---
title: Intermediate classes for setting variables
description: Intermediate helper classes just for setting CSS custom properties.
created: 2021-07-26
tags:
  - 'CSS'
---

Let's have a brand color with a few shades.

```css
/* ./index.css */

:root {
	--hue-sat-brand: 284, 80%;

	--brand-dim: hsl(var(--hue-sat-brand), 35%);
	--brand: hsl(var(--hue-sat-brand), 55%);
	--brand-bright: hsl(var(--hue-sat-brand), 75%);
}
```

Let’s have a **class** that only defines / redefines variables. Sort of **intermediary**.

```css
/* ./accents.css */

.brand {
	--accent-dim: var(--brand-dim);
	--accent: var(--brand);
	--accent-bright: var(--brand-bright);
}
```

So, now if I want to accentuate some text, I add a helper class to the tag.

```css
/* colorize-text */
.ct {
	color: var(--accent);
}
```

```html
<span class="brand ct">brand color</span>
```

But if I have an `<article>` and want to accentuate some `<span>` tags, I can just add an **intermediate class** to the `<article>`.

```html
<article class="brand">
	<p>lorem... <span class="ct">brand color</span></p>
	<p>lorem... <span>default color</span></p>
</article>
```

Just for one tag this approach is useless. But if I have large sections, cards, it’s nice just to define color for the component, then reuse it for its elements.

Also I would have to add a **class** that resets variables.

```css
.base {
	--accent-dim: initial;
	--accent: initial;
	--accent-bright: initial;
}
```

So now if I need to, I can reset elements I choose.

```html
<article class="brand ct">
	<span>brand color</span>
	<span class="base">default color</span>
</article>
```

---

Or if I have more than one color.

```css
:root {
	--hue-sat-danger: 0, 66%;

	--danger-dim: hsl(var(--hue-sat-danger), 35%);
	--danger: hsl(var(--hue-sat-danger), 55%);
	--danger-bright: hsl(var(--hue-sat-danger), 75%);
}

.danger {
	--accent-dim: var(--danger-dim);
	--accent: var(--danger);
	--accent-bright: var(--danger-bright);
}
```

It still works.

```html
<article class="brand">
	<p>default color <span class="ct">brand color</span></p>

	<p class="ct">brand color<span class="base">default color</span></p>

	<section class="danger">
		<span>default color</span>
		<span class="ct">danger color</span>

		<div class="ct">
			<span>danger color</span>
			<b class="brand">brand color</b>
		</div>
	</section>
</article>
```

---

But what if I have two themes, light and dark? I need different shades of color to accentuate text, like a brighter shade on a dark theme than on a light. I would have to add new variables, like so:

```css
:is(.brand, .danger) {
	--accent-text: var(--accent);
}

html.dark :is(.brand, .danger) {
	--accent-text: var(--accent-bright);
}

.base {
	--accent-text: initial;
}
```

And then

```css
.ct {
	color: var(--accent-text);
}
```

---

And now I have to style classic `<button>`s. So I just "extend" my **intermediate classes**.

```css
/* ./buttons.css */

:is(.base) {
	--btn-text: black;
	--btn-bg: lightpink;
}

:is(.brand, .danger) {
	--btn-text: white;
	--btn-bg: var(--accent);
}

button {
	/* If no intermediate class - fallbacks help with that. */
	color: var(--btn-text, black);
	background-color: var(--btn-bg, lightpink);
}
```
