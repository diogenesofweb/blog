---
title: CSS Reset
description: CSS Reset
created: 2021-02-02
tags:
  - 'CSS'
---

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

body,
figure,
blockquote,
dl,
dd,
ul {
  margin: 0;
  padding: 0;
}

ul[role='list'],
ol[role='list'] {
  list-style: none;
}

html:focus-within {
  scroll-behavior: smooth;
}

img,
picture {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
}

@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
