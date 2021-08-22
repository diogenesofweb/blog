---
title: HSL colors with vars
description: Defining color palette with CSS custom properties and HSL
created: 2021-06-23
tags:
  - 'CSS'
---

Let’s have 4 colors to play with:

1. **Danger** - red (deletes)
2. **Alpha** - brand / primary
3. **Beta** - complementary / secondary
4. **Gamma** - for warnings? (yellow / orange)

And for the palette, 5 shades of color will be.

1. `--[color]-dim`
2. `--[color]-dowm`
3. `--[color]`
4. `--[color]-up`
5. `--[color]-bright`

Naming is far from perfect, but I like it better than `[color]-100`, `[color]-200`...

So, with custom properties:

1. `var(--alpha-dim)`
2. `var(--alpha-down)`
3. `var(--alpha)`
4. `var(--alpha-up)`
5. `var(--alpha-bright)`

---

Nice thing about [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) is the possibility to define fallback values.
It comes in handy for making a starter palette with default colors and easily customizable.

Variables prefixed with `--my` are the ones to be set for the project.

```css
:root {
  --lightness-bottom: var(--my-lightness-bottom, 40%);
  --lightness-down: var(--my-lightness-down, 45%);
  --lightness-base: var(--my-lightness-base, 50%);
  --lightness-up: var(--my-lightness-up, 55%);
  --lightness-top: var(--my-lightness-bright, 75%);

  --hue-sat-alpha: var(--my-hue-sat-alpha, 220, 60%);
  --hue-sat-beta: var(--my-hue-sat-beta, 280, 50%);
  --hue-sat-gamma: var(--my-hue-sat-gamma, 180, 22%);
  --hue-sat-danger: var(--my-hue-sat-danger, 0, 40%);

  --alpha-dim: hsl(var(--hue-sat-alpha), var(--lightness-bottom));
  --alpha-down: hsl(var(--hue-sat-alpha), var(--lightness-down));
  --alpha: hsl(var(--hue-sat-alpha), var(--lightness-base));
  --alpha-up: hsl(var(--hue-sat-alpha), var(--lightness-up));
  --alpha-bright: hsl(var(--hue-sat-alpha), var(--lightness-top));

  --beta-dim: hsl(var(--hue-sat-beta), var(--lightness-bottom));
  --beta-down: hsl(var(--hue-sat-beta), var(--lightness-down));
  --beta: hsl(var(--hue-sat-beta), var(--lightness-base));
  --beta-up: hsl(var(--hue-sat-beta), var(--lightness-up));
  --beta-bright: hsl(var(--hue-sat-beta), var(--lightness-top));

  --gamma-dim: hsl(var(--hue-sat-gamma), var(--lightness-bottom));
  --gamma-down: hsl(var(--hue-sat-gamma), var(--lightness-down));
  --gamma: hsl(var(--hue-sat-gamma), var(--lightness-base));
  --gamma-up: hsl(var(--hue-sat-gamma), var(--lightness-up));
  --gamma-bright: hsl(var(--hue-sat-gamma), var(--lightness-top));

  --danger-dim: hsl(var(--hue-sat-danger), var(--lightness-bottom));
  --danger-down: hsl(var(--hue-sat-danger), var(--lightness-down));
  --danger: hsl(var(--hue-sat-danger), var(--lightness-base));
  --danger-up: hsl(var(--hue-sat-danger), var(--lightness-up));
  --danger-bright: hsl(var(--hue-sat-danger), var(--lightness-top));
}
```

So for setting project colors.

```css
:root {
  --my-hue-sat-danger: 0, 50%;
  --my-hue-sat-alpha: 210, 60%;
  --my-hue-sat-beta: 162, 40%;
  --my-hue-sat-gamma: 26, 60%;
}

/* html.dark {} */
```

Then, adjusting only brightness.

```css
/* lightness up */
:root {
  --my-lightness-bottom: 30%;
  --my-lightness-down: 60%;
  --my-lightness-base: 75%;
  --my-lightness-up: 80%;
  --my-lightness-bright: 80%;
}

/* lightness down on dark mode*/
html.dark {
  --my-lightness-bottom: 15%;
  --my-lightness-down: 20%;
  --my-lightness-base: 28%;
  --my-lightness-up: 32%;
  --my-lightness-bright: 70%;
}
```

Helper classes

```css
.alpha {
  --active-color-dim: var(--alpha-dim);
  --active-color-down: var(--alpha-down);
  --active-color: var(--alpha);
  --active-color-up: var(--alpha-up);
  --active-color-bright: var(--alpha-bright);
}

.beta {
  --active-color-dim: var(--beta-dim);
  --active-color-down: var(--beta-down);
  --active-color: var(--beta);
  --active-color-up: var(--beta-up);
  --active-color-bright: var(--beta-bright);
}

.gamma {
  --active-color-dim: var(--gamma-dim);
  --active-color-down: var(--gamma-down);
  --active-color: var(--gamma);
  --active-color-up: var(--gamma-up);
  --active-color-bright: var(--gamma-bright);
}

.danger {
  --active-color-dim: var(--danger-dim);
  --active-color-down: var(--danger-down);
  --active-color: var(--danger);
  --active-color-up: var(--danger-up);
  --active-color-bright: var(--danger-bright);
}
```

Depending on contrast ratio (not only), setting additional properties are useful. Like for the color of text and icons, lighter on dark / dimmed background.

```css
:is(.alpha, .beta, .gamma, .danger) {
  --active-color-text: var(--active-color-dim);
  --active-color-text: var(--active-color-down);
}

html.dark :is(.alpha, .beta, .gamma, .danger) {
  --active-color-text: var(--active-color-bright);
}
```

Page text and background colors.

```css
:root {
  --hue-sat-bg: 215, 5%;
  --bg: hsl(var(--hue-sat-bg), 100%);
  --bg-darker: hsl(var(--hue-sat-bg), 95%);
  --bg-darkest: hsl(var(--hue-sat-bg), 90%);

  --text: hsl(0, 0%, 16%);
  --text-dim: hsl(0, 0%, 26%); /* bold text / bigger size */
  --text-accent: var(--alpha-down); /* highlighting / links */
  --text-hover: var(--beta-down);
}

html.dark {
  --hue-sat-bg: 215, 5%;
  --bg: hsl(var(--hue-sat-bg), 15%);
  --bg-darker: hsl(var(--hue-sat-bg), 13%);
  --bg-darkest: hsl(var(--hue-sat-bg), 11%);

  --text: hsl(0, 0%, 96%);
  --text-dim: hsl(0, 0%, 86%);
  --text-accent: var(--alpha-bright);
  --text-hover: var(--beta-bright);
}
```

---

For example, styling buttons (only properties for coloring are included)

Normal button with alpha color - `.btn.alpha`, and outlined - `.btn.outlined.alpha`.

```css
:root {
  --btn-text: hsl(0, 0%, 100%); /* default color */
  --btn-outline-size: 0 0 0.05rem 0.15rem;
}

.btn {
  --btn-bg: var(--active-color, var(--bg-dark));
  --btn-bg-hover: var(--active-color-up, var(--bg-darkest));

  color: var(--btn-text);
  background-color: var(--btn-bg);
  border-color: var(--btn-border-color, transparent);
}

/* OUTLINED */
.btn.outlined:not(:hover) {
  background-color: var(--bg);
  --btn-text: var(--active-color-text);
  --btn-border-color: var(--active-color-text);
}
/* OUTLINED */
```

```css
/* HOVER & FOCUS */
.btn.outlined:hover,
.btn:hover:not(:focus) {
  background-color: var(--btn-bg-hover, var(--bg-darker));
}

.btn:focus-visible {
  z-index: 1;
  box-shadow: var(--btn-outline-size) var(--active-color-bright, hsl(0, 0%, 50%, 0.33));
}

html.dark .btn:focus-visible {
  /* reset to gray shadow, colored one is not visible on dark bg*/
  box-shadow: var(--btn-outline-size) hsl(0, 0%, 80%, 0.6);
}

.btn:focus:not(:focus-visible) {
  filter: brightness(90%);
}
/* HOVER & FOCUS */
```
