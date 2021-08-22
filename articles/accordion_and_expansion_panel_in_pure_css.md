---
title: Accordion and Expansion Panel in pure CSS
description: Building Accordion & Expansion Panel in pure CSS without any JS using <details>
created: 2021-06-06
tags:
  - 'CSS'
---

Recently I needed to build a simple FAQ page for an SSG website and wanted to make it as light and simple as possible. So, I quickly looked for ‘accordion’ and ‘expansion panels’ examples in popular libraries. No one of them used `<details>` tag. All went with a bunch of `<div>`’s with `<button>` and obviously applied some JS. Even though `<details>` is especially suited for that kind of thing, and with 0 JS.

Yes, I know we can't animate `<details>`’s height on state change (open-close) without JS, which is definitely an annoyance, but is it really necessary?

`<details>` is a browser native solution, and a good one. Should I not forget it!

---

Now, let’s build an **accordion** with `<details>`. Here [Demo](https://diogenesofweb.github.io/demo-accordion-expantion/) and [Repo](https://github.com/diogenesofweb/demo-accordion-expantion)

<iframe src="https://diogenesofweb.github.io/demo-accordion-expantion/"
        title="Demo: Accordion and Expansion Panel" 
        width="300" height="600">
</iframe>

First, we would need some html

```html
<details>
  <summary>
    <span>Some text ...</span>

    <svg class="plus" viewBox="0 0 16 16">
      <path
        d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"
      />
    </svg>
  </summary>

  <div class="content">
    <span>Some text ...</span>
  </div>
</details>
```

SVG is ➕ icon on closed state, and will be rotated 45deg to ❌ in open state.\
To get rid of triangle marker is suffice to change `display` to `flex` or `grid` on `<summary>`

Let's define variables. It helps me to update / finetune styling.

```css
:root {
  --text-color: hsl(0, 0%, 20%);
  --bg-color: hsl(0, 0%, 100%);

  --hs-base: 300, 100%;
  --primary: hsl(var(--hs-base), 15%);

  --summary-bg-color: hsl(var(--hs-base), 98%);
  --summary-hover-bg-color: hsl(var(--hs-base), 90%);

  --border: 3px solid hsl(var(--hs-base), 80%);
  --border-radius: 0.66rem;

  --padding-x: clamp(1rem, 5%, 2.5rem);

  --transition-duration: 300ms;
  --transition-timing-function: ease-in;
}
```

`<details>` tag doesn't need a lot of styling, just add borders.

```css
details {
  overflow: hidden;
  border: var(--border);
  border-top: none;
}

details:first-child {
  border: var(--border);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

details:last-child {
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}
```

And now `<details>`’s children elements

```css
summary {
  display: grid;
  grid-template-columns: 1fr 1em;
  align-items: center;
  gap: 2em;

  font-size: calc(1rem + 2px);
  font-weight: bold;

  cursor: pointer; /* I wonder why is this not default behavior */

  background-color: var(--summary-bg-color);
  padding: 1.25rem var(--padding-x);

  transition-property: color, background-color;
}

details[open] > summary {
  font-style: italic;
}

summary:focus,
summary:hover {
  outline: none;
  background-color: var(--summary-hover-bg-color);
  color: var(--primary); /* Icon also will change color */
}

details .content {
  position: relative;
  z-index: -1; /* for animation, hide behind summary */

  background-color: var(--bg-color);
  color: var(--text-color);

  padding: 1px var(--padding-x);
}

svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}

details[open] svg.plus {
  transform: rotate(45deg);
  transition-property: transform;
}
```

Nice thing about SVG in HTML is that we can set `fill: currentColor`, which would be impossible with `background-image: url("data:image/svg+xml, ...")` or `<img src=”x.svg”>`.

Some animation if dear user is ok with it.

```css
@keyframes appear {
  0% {
    opacity: 0;
    transform: translateY(max(-2rem, -100%));
  }
  100% {
    opacity: 1;
    transform: translateY(1);
  }
}

@media (prefers-reduced-motion: no-preference) {
  details * {
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
  }

  details[open] .content {
    animation: appear var(--transition-duration) var(--transition-timing-function);
  }
}
```
