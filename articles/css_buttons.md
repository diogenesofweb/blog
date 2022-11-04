---
title: CSS Buttons
description: Style buttons differentiating between events.
created: 2021-06-14
tags:
  - 'CSS'
---

First global [reset](/blog/css_reset), then:

```css
button {
	border: none;
	outline: none;
	cursor: pointer;
	text-decoration: none;
}

button:hover,
button:focus {
	outline: none;
}

button:disabled {
	cursor: not-allowed;
	opacity: 0.5;
}
```

---

Button should change depending on different events, indicating that user input is well registered.

**Distinction** is to be made (visually) between these events:

1. Mouse over (:hover).
2. Keyboard navigation through tabing (:focus-visible).
3. The button has been clicked / touched (:focus).

Then, accordingly, **visual change** could be:

1. Background color becomes a little bit brighter.
2. Outlined shadow.
3. Button becomes a little bit dimmer.

```css
/* Missing variables are defined in the next code block. */

/* Mouse over */
.btn:hover {
	background-color: var(--btn-bg-hover);
}

/* Keyboard navigation */
/* LIGHT (default) theme */
.btn:focus-visible {
	z-index: 1;
	/* ajust --color depending on btn background, here for blue one */
	--btn-outline-shadow-color: hsla(240, 100%, 50%, 0.5);
	box-shadow: var(--btn-outline-shadow-size) var(--btn-outline-shadow-color);
}

/* DARK theme */
html.dark .btn:focus-visible {
	/* Reset to gray shadow, colored ones have bad visibility on dark backgrounds */
	--btn-outline-shadow-color: hsla(0, 0%, 80%, 0.5);
}

/* Btn clicked / touched */
.btn:focus:not(:focus-visible) {
	filter: brightness(90%);
}
```

Here, selector `.btn` is used and not `button` because sometimes I want links to look like buttons.

---

Minimal subjective styling.

```css
/* COLORS */
:root {
	--btn-color: black;
	--btn-bg: hsl(0, 0%, 80%);
	--btn-bg-hover: hsl(0, 0%, 70%);
}

html.dark {
	--btn-color: white;
	--btn-bg: hsl(150, 20%, 10%);
	--btn-bg-hover: hsl(150, 20%, 12%);
}
/* COLORS */

:root {
	--btn-min-height: 3em;
	--btn-outline-shadow-size: 0 0 0.05rem 0.15rem;
}

.btn {
	position: relative;

	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 1em; /* For if button will include text with icon */

	/* Better explicitly set button height than relay on padding for y-axis sizing. */
	min-height: var(--btn-min-height);
	padding: 0.1em 1.5em;

	color: var(--btn-color);
	background-color: var(--btn-bg);

	text-transform: uppercase;
	line-height: 1;
	letter-spacing: 2px;
	/* font-size: calc(1rem + 2px); */

	border-radius: 0.5rem;

	/* if `outlined` btns are needed: */
	/* border: thin solid transparent; */
	/* then change border-color on `outlined` class .. */
}
```

And now, for example, adjusting the button's look following brand (primary) color.

```css
.btn.brand {
	--btn-color: white;
	--btn-bg: hsl(280, 50%, 35%);
	--btn-bg-hover: hsl(280, 30%, 40%);
	--btn-outline-shadow-color: hsl(280, 30%, 35%, 0.5);
}
```

Or even better

```css
:root {
	--hue-sat-brand: 280, 50%;
}

.btn.brand {
	--btn-color: white;
	--btn-bg: hsl(var(--hue-sat-brand), 35%);
	--btn-bg-hover: hsl(var(--hue-sat-brand), 45%);
	--btn-outline-shadow-color: hsla(var(--hue-sat-brand), 35%, 0.5);
}
```

To read: [The :focus-visible Trick](https://css-tricks.com/the-focus-visible-trick/)
