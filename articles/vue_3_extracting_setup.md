---
title: Vue 3 extracting setup
description: Vue 3 extracting setup() from a large component in a separate file
created: 2021-06-08
tags:
  - 'Vue'
---

When I want to move quickly and / or I don't have a clear idea what I'm doing, my components become very large. A lot of deletes, renaming... refactoring is going on... At this stage I don't want to break them into separate components.

So, I found it more practical to extract `setup()` in a separate `componentName.setup.js` file. Split IDE view in half.
On the left side `.vue`, on the right - `.setup.js`.

Besides, '.js' files have noticeably better support in vscode than `.vue`.

Why `componentName.setup.js` and not just `componentName.js` ?\
For better searching in vscode with **Ctrl+p**.

```markup
<!-- ~/LargeComponent.vue -->

<style scoped>
  /* a lot of styling */
</style>

<template>
  <!-- 30+ lines -->
</template>

<script>
import setup from './largeComponent.setup.js'

export default {
  setup,
}
</script>
```

```js
/* ~/largeComponent.setup.js */

export default function setup(props, { attrs, slots, emit }) {
	//
}
```
